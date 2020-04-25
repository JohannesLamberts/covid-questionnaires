<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">
          {{ JSON.stringify(gitContent) }}
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import netlifyIdentity from 'netlify-identity-widget'
import { readFile } from '@/api/git'

export default {
  data() {
    return {
      gitContent: {}
    }
  },
  async mounted() {
    this.$axios.setToken(
      netlifyIdentity.currentUser().token.access_token,
      'Bearer'
    )
    const { content } = await readFile(
      'package.json'
    ) /* this.$axios.$get(
      'https://covid-questionaires.netlify.app/.netlify/git/github/contents/package.json'
    ) */
    this.gitContent = JSON.parse(content)
  }
}
</script>
