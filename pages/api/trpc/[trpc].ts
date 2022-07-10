import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import SpotifyWebApi from "spotify-web-api-node";
import { Context, createContext } from "../../../utils/context";

export const appRouter = trpc.router<Context>().query("get-tracks", {
  resolve: async ({ ctx }) => {
    const session = ctx.session;

    if (!session) {
      return { error: "No session detected" };
    }
    const spotify = new SpotifyWebApi();
    spotify.setAccessToken(session.accessToken as string);

    try {
      const response = await spotify.getMyRecentlyPlayedTracks({ limit: 3 });
      return {
        tracks: response.body.items.map((item) => {
          const trackData = item.track;
          return {
            name: trackData.name,
            artists: trackData.artists.map((artist) => artist.name),
            images: trackData.album.images,
          };
        }),
      };
    } catch (e) {
      return { error: `Failed to get tracks data: ${e}` };
    }
  },
});

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
