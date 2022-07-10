import type { ReactElement } from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import CommonLayout from "../components/layouts/CommonLayout";

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
  return <> main page </>;
}

Main.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>;
};
