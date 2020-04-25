import netlifyIdentity from 'netlify-identity-widget'

export function jwt() {
  return netlifyIdentity.currentUser().token.access_token
}
