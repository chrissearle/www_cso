import { useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "components/Layout";

import { pageview } from "lib/ga";

import "bootstrap/dist/css/bootstrap.css";
import "prismjs/themes/prism-solarizedlight.css";

import "styles/overrides.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
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
