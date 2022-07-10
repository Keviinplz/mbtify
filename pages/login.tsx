import type { ReactElement } from "react";

import CommonLayout from "../components/layouts/CommonLayout";

export default function Login() {
  return <> Login page </>;
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>;
};
