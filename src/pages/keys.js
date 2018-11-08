import React from 'react'

import { Card, CardBody, CardHeader, CardFooter } from 'reactstrap'

import Layout from '../components/layout'

const Keys = () => {
  return (
    <Layout>
      <h2 className="mb-4">Cryptographic Keys</h2>
      <Card className="mb-4" outline color="primary">
        <CardHeader>Current</CardHeader>
        <CardBody>
          <p>
            Get the public keys direct from the keyservers or you can find my{' '}
            <a href="https://keybase.io/chrissearle">keybase.io profile here</a>
          </p>

          <h3>Work (BB80AB21)</h3>
          <pre className="border p-4">
            Fingerprint: FF6E 6FFA C4CB 0727 38D0 E1EB 4E5F 28B9 BB80 AB21
          </pre>

          <h3>Private (D4BF0A41)</h3>
          <pre className="border p-4">
            Fingerprint: 116F BA82 9506 5A01 C3BC 7CC6 CF79 BF54 D4BF 0A41
          </pre>
        </CardBody>
        <CardFooter>
          <p>
            These replace the older two keys and are both using a larger key
            size and SHA-256 instead of SHA-1.
          </p>
          <p>
            <a href="http://ekaia.org/blog/2009/05/10/creating-new-gpgkey/">
              This blog post by Ana Beatriz Guerrero López
            </a>{' '}
            was very clear on how to generate these new keys.
          </p>
        </CardFooter>
      </Card>
      <Card className="mb-4" outline color="warning">
        <CardHeader>Outdated</CardHeader>
        <CardBody>
          <h3>Work (83C1EAEB)</h3>
          <pre className="border p-4">
            Fingerprint: 0D89 45A9 A5CD 15C4 FF77 7D8D 8FEA 08A2 83C1 EAEB
          </pre>

          <h3>Home/Scouts (224A5434)</h3>
          <pre className="border p-4">
            Fingerprint: A4AE 46C6 EA6C DD12 CC57 623F BF50 786C 224A 5434
          </pre>
        </CardBody>
        <CardFooter>These keys are no longer in use</CardFooter>
      </Card>
    </Layout>
  )
}

export default Keys
