import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import SpotifyWebApi from "spotify-web-api-node";
import { z } from "zod";
import { Context, createContext } from "../../../utils/context";

interface WebapiRegularError {
  body: { error: object };
  headers: object;
  statusCode: number;
}

export const appRouter = trpc.router<Context>().query("get-tracks", {
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
});

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
