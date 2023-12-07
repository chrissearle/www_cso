<template>
  <Head>
    <Title>Chris Searle - Cryptographic Keys</Title>
  </Head>
  <div class="container mx-auto mt-10">
    <h1
      class="text-typography_primary font-bold mb-4 md:mb-6 text-h3 leading-h3 md:text-h2 md:leading-h2 text-center md:text-left"
    >
      Cryptographic Keys
    </h1>

    <div class="border rounded border-blue-500 p-10 mb-10">
      <h2 class="main-heading">Current</h2>

      <p>
        Get the public keys direct from the keyservers. You can also check the
        proofs on my
        <a
          href="https://keyoxide.org/116FBA8295065A01C3BC7CC6CF79BF54D4BF0A41"
          target="_blank"
          rel="noopener noreferer"
          >keyoxide profile</a
        >
      </p>

      <h4 class="sub-heading">Work (BB80AB21)</h4>

      <div class="fingerprint">
        Fingerprint: FF6E 6FFA C4CB 0727 38D0 E1EB 4E5F 28B9 BB80 AB21
      </div>

      <h4 class="sub-heading">Private (D4BF0A41)</h4>

      <div class="fingerprint">
        Fingerprint: 116F BA82 9506 5A01 C3BC 7CC6 CF79 BF54 D4BF 0A41
      </div>

      <div class="info">
        <p>
          These replace the older two keys and are both using a larger key size
          and SHA-256 instead of SHA-1.
          <a
            href="http://ekaia.org/blog/2009/05/10/creating-new-gpgkey/"
            target="_blank"
            rel="noopener noreferer"
          >
            This blog post by Ana Beatriz Guerrero López</a
          >
          was very clear on how to generate these new keys.
        </p>
      </div>
    </div>
    <div class="border rounded border-red-500 p-10">
      <h2 class="main-heading">Outdated</h2>

      <h4 class="sub-heading">Work (83C1EAEB)</h4>

      <div class="fingerprint">
        Fingerprint: 0D89 45A9 A5CD 15C4 FF77 7D8D 8FEA 08A2 83C1 EAEB
      </div>

      <h4 class="sub-heading">Home/Scouts (224A5434)</h4>

      <div class="fingerprint">
        Fingerprint: A4AE 46C6 EA6C DD12 CC57 623F BF50 786C 224A 5434
      </div>

      <div className="info">These keys are no longer in use</div>

      <h4 class="sub-heading">Keybase</h4>

      <p>
        I am migrating away from keybase - but the
        <a
          href="https://keybase.io/chrissearle"
          target="_blank"
          rel="noopener noreferer"
        >
          keybase.io profile is here </a
        >. See the keyoxide link above instead for verifications.
      </p>
    </div>
  </div>
</template>

<style scoped>
.main-heading {
  @apply text-typography_primary font-bold mb-4 md:mb-6 text-h4 leading-h4 md:text-h3 md:leading-h3 text-center md:text-left;
}

.sub-heading {
  @apply text-typography_primary font-bold mt-5 md:mt-6 mb-4 md:mb-6 text-h5 leading-h5 md:text-h4 md:leading-h4 text-center md:text-left;
}

.fingerprint {
  @apply border p-4 mt-5 mb-5 font-mono;
}

a {
  @apply text-blue-400;
}
</style>
