import type { ReactElement } from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import CommonLayout from "../components/layouts/CommonLayout";
import { trpc } from "../utils/trpc";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Main() {
  const hello = trpc.useQuery(["get-tracks"]);

  if (!hello.data) {
    return <p>Loading...</p>;
  }

  return <> {JSON.stringify(hello.data.tracks, null, 4)} </>;
}

Main.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>;
};
