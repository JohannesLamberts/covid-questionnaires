/* eslint-disable prettier/prettier */
<template>
  <v-app dark>
    <v-navigation-drawer permanent app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
