<template>
  <UContainer>
    <Head>
      <Title>Cryptographic Keys</Title>
    </Head>

    <h1 class="pageTitle">Cryptographic Keys</h1>

    <h2 class="sectionTitle">Current</h2>

      <div class="d-flex flex-column ga-6 ma-6">
        <v-card>
          <v-card-title>
            <h4 class="text-h4">Current</h4>
          </v-card-title>

          <v-card-subtitle>
            Get the public keys direct from the keyservers.
            You can also check the proofs on my
            <a
                href="https://keyoxide.org/116FBA8295065A01C3BC7CC6CF79BF54D4BF0A41"
                target="_blank"
                rel="noopener noreferer"
            >
              keyoxide profile
            </a>
          </v-card-subtitle>

          <v-card-text>
            <h5 class="text-h5">Work (BB80AB21)</h5>

            <div class="fingerprint">
              Fingerprint: FF6E 6FFA C4CB 0727 38D0 E1EB 4E5F 28B9 BB80 AB21
            </div>
          </v-card-text>

          <v-card-text>
            <h5 class="text-h5">Private (D4BF0A41)</h5>

            <div class="fingerprint">
              Fingerprint: 116F BA82 9506 5A01 C3BC 7CC6 CF79 BF54 D4BF 0A41
            </div>
          </v-card-text>

          <v-card-text>
            These replace the older two keys and are both using a larger key size
            and SHA-256 instead of SHA-1.

            <a
                href="http://ekaia.org/blog/2009/05/10/creating-new-gpgkey/"
                target="_blank"
                rel="noopener noreferer"
            >This blog post by Ana Beatriz Guerrero López</a>
            was very clear on how to generate these new keys.
          </v-card-text>
        </v-card>

        <h2 class="sectionTitle">Outdated</h2>

        <v-card>
          <v-card-title>
            <h4 class="text-h4">Outdated</h4>
          </v-card-title>

          <v-card-subtitle>
            These keys are no longer in use - but are published to help showing the history
          </v-card-subtitle>

          <v-card-text>
            <h5 class="text-h5">Work (83C1EAEB)</h5>

            <p class="my-2">Replaced by BB80AB21</p>

            <div class="fingerprint">
              Fingerprint: 0D89 45A9 A5CD 15C4 FF77 7D8D 8FEA 08A2 83C1 EAEB
            </div>
          </v-card-text>

          <v-card-text>
            <h5 class="text-h5">Home/Scouts (224A5434)</h5>

            <p class="my-2">Replaced by D4BF0A41</p>

            <div class="fingerprint">
              Fingerprint: A4AE 46C6 EA6C DD12 CC57 623F BF50 786C 224A 5434
            </div>
          </v-card-text>
        </v-card>
      </div>
  </UContainer>
</template>
<script setup lang="ts">
</script>