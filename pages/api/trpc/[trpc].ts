import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import SpotifyWebApi from "spotify-web-api-node";
import { z } from "zod";
import { Context, createContext } from "../../../utils/context";
import { klassMapping } from "../../../ai/mapping";
import * as ort from "onnxruntime-node";
import path from "path";

const calculateMeanFeatures = (features: SpotifyApi.AudioFeaturesObject[]) => {
  const meanFeatures = {
    acousticness: 0,
    danceability: 0,
    duration_ms: 0,
    energy: 0,
    instrumentalness: 0,
    key: 0,
    liveness: 0,
    loudness: 0,
    mode: 0,
    speechiness: 0,
    tempo: 0,
    time_signature: 0,
    valence: 0,
    popularity: 1,
  };

  features.forEach((feature) => {
    meanFeatures.acousticness += feature.acousticness;
    meanFeatures.danceability += feature.danceability;
    meanFeatures.duration_ms += feature.duration_ms;
    meanFeatures.energy += feature.energy;
    meanFeatures.instrumentalness += feature.instrumentalness;
    meanFeatures.key += feature.key;
    meanFeatures.liveness += feature.liveness;
    meanFeatures.loudness += feature.loudness;
    meanFeatures.mode += feature.mode;
    meanFeatures.speechiness += feature.speechiness;
    meanFeatures.tempo += feature.tempo;
    meanFeatures.time_signature += feature.time_signature;
    meanFeatures.valence += feature.valence;
  });

  (Object.keys(meanFeatures) as Array<keyof typeof meanFeatures>).forEach(
    (key) => {
      meanFeatures[key] /= features.length;
    }
  );

  return meanFeatures;
};

const getMBTICharacteristics = async (
  features: SpotifyApi.AudioFeaturesObject[]
) => {
  const MODEL_PATH = path.join(process.cwd(), 'ai', 'model.onnx');
  const session = await ort.InferenceSession.create(MODEL_PATH);
  const meanFeatures = calculateMeanFeatures(features);
  const inputFeatures = Object.fromEntries(
    Object.entries(meanFeatures).map(([key, value]) => [
      key,
      new ort.Tensor("float32", new Float32Array([value]), [1, 1]),
    ])
  );
  const outputMap = await session.run(inputFeatures);

  const results = outputMap.label.data;

  if (results.length !== 1) {
    throw new Error("Invalid results");
  }

  return Number(results[0]);
};

export const appRouter = trpc
  .router<Context>()
  .query("get-tracks", {
    input: z.object({ limit: z.number().min(1).max(10) }).nullish(),
    resolve: async ({ ctx, input }) => {
      const session = ctx.session;

      if (!session) {
        return { error: "No session detected" };
      }
      const spotify = new SpotifyWebApi();
      spotify.setAccessToken(session.accessToken as string);

      try {
        const response = await spotify.getMyRecentlyPlayedTracks({
          limit: input?.limit || 3,
        });
        return {
          tracks: response.body.items.map((item) => {
            const trackData = item.track;
            return {
              id: trackData.id,
              name: trackData.name,
              artists: trackData.artists.map((artist) => artist.name),
              album: { id: trackData.album.id, name: trackData.album.name },
              images: trackData.album.images,
              url: trackData.external_urls.spotify,
            };
          }),
        };
      } catch (e: any) {
        if (e.statusCode && e.statusCode === 401) {
          return { error: "Unauthorized" };
        }
        return { error: `Failed to get tracks data: ${e}` };
      }
    },
  })
  .query("process-tracks", {
    input: z.object({
      tracks: z.array(z.string()),
    }),
    resolve: async ({ ctx, input }) => {
      const session = ctx.session;

      if (!session) {
        return { error: "No session detected" };
      }
      const spotify = new SpotifyWebApi();
      spotify.setAccessToken(session.accessToken as string);

      try {
        const response = await spotify.getAudioFeaturesForTracks(input.tracks);
        const features = response.body.audio_features;
        const klass = (await getMBTICharacteristics(
          features
        )) as keyof typeof klassMapping;

        return { klass, klassName: klassMapping[klass] };
      } catch (e: any) {
        console.log({ e });
        if (e.statusCode && e.statusCode === 401) {
          return { error: "Unauthorized" };
        }
        return { error: `Failed to get valence data from tracks: ${e}` };
      }
    },
  });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
