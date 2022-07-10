import type { ReactElement } from "react";

import CommonLayout from "../components/layouts/CommonLayout";
import type { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return <> jeje </>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>;
};

export default Home;
