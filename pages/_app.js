import "bootstrap/dist/css/bootstrap.css";
import "prismjs/themes/prism-solarizedlight.css";
import "styles/overrides.css";

import * as gtag from "../lib/ga";

import Layout from "components/Layout";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Layout files={pageProps.files}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
