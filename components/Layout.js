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
      <div className="drawer lg:drawer-open">
        <input id="right-drawer" type="checkbox" className="drawer-toggle" />
        <main className="drawer-content flex flex-col items-center">
          {children}
        </main>
        <Sidebar files={files} />
      </div>
    </>
  );
}
