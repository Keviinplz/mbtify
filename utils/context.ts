import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { NodeHTTPCreateContextFnOptions } from "@trpc/server/dist/declarations/src/adapters/node-http";
import { IncomingMessage } from "http";
import { getSession } from "next-auth/react";
type CreateContextParams =
  | trpcNext.CreateNextContextOptions
  | NodeHTTPCreateContextFnOptions<IncomingMessage, any>;

export const createContext = async ({ req, res }: CreateContextParams) => {
  const session = await getSession({ req });
  return { req, res, session };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
