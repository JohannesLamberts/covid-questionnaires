/* eslint-disable prettier/prettier */
<template>
  <v-app dark>
    <v-content v-if="loggedIn">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer fixed app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import netlifyIdentity from 'netlify-identity-widget'

export default {
  data() {
    return {
      loggedIn: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      title: 'Vuetify.js'
    }
  },
  mounted() {
    netlifyIdentity.init()
    window.netlifyIdentity = netlifyIdentity
    if (!netlifyIdentity.currentUser()) {
      netlifyIdentity.open('login')
      netlifyIdentity.on('login', () => {
        this.loggedIn = true
      })
      return
    }
    this.loggedIn = true
  }
}
</script>
