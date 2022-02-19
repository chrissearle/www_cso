import Head from "next/head";

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ files, children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <div className="d-flex">
        <main className="container flex-grow-1">{children}</main>
        <Sidebar files={files} />
      </div>
    </>
  );
}
