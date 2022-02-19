import Head from "next/head";

import Meta from "components/Meta";

import { loadMarkdown } from "lib/posts";

function Fingerprint({ title, hash, fingerprint }) {
  return (
    <>
      <h4>
        {title} ({hash})
      </h4>
      <pre className="border p-4 mt-4">Fingerprint: {fingerprint}</pre>
    </>
  );
}

export default function Keys() {
  return (
    <>
      <Head>
        <title>Chris Searle - Cryptographic Keys</title>
      </Head>
      <Meta title="Cryptographic Keys" />
      <h2 className="my-4">Cryptographic Keys</h2>

      <div className="card mb-4 border border-primary">
        <div className="card-header">Current</div>
        <div className="card-body">
          <p>
            Get the public keys direct from the keyservers or you can find my{" "}
            <a href="https://keybase.io/chrissearle">keybase.io profile here</a>
          </p>

          <Fingerprint
            title="Work"
            hash="BB80AB21"
            fingerprint="FF6E 6FFA C4CB 0727 38D0 E1EB 4E5F 28B9 BB80 AB21"
          />

          <Fingerprint
            title="Private"
            hash="D4BF0A41"
            fingerprint="116F BA82 9506 5A01 C3BC 7CC6 CF79 BF54 D4BF 0A41"
          />
        </div>
        <div className="card-footer">
          <p>
            These replace the older two keys and are both using a larger key
            size and SHA-256 instead of SHA-1.
          </p>
          <p>
            <a href="http://ekaia.org/blog/2009/05/10/creating-new-gpgkey/">
              This blog post by Ana Beatriz Guerrero López
            </a>{" "}
            was very clear on how to generate these new keys.
          </p>
        </div>
      </div>
      <div className="card border border-warning">
        <div className="card-header">Outdated</div>
        <div className="card-body">
          <Fingerprint
            title="Work"
            hash="83C1EAEB"
            fingerprint="0D89 45A9 A5CD 15C4 FF77 7D8D 8FEA 08A2 83C1 EAEB"
          />

          <Fingerprint
            title="Home/Scouts"
            hash="224A5434"
            fingerprint="A4AE 46C6 EA6C DD12 CC57 623F BF50 786C 224A 5434"
          />
        </div>
        <div className="card-footer">These keys are no longer in use</div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      files: loadMarkdown({ reverse: true }),
    },
  };
}
