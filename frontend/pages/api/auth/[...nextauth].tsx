import NextAuth from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak";


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    KeycloakProvider({
        clientId: process.env.KEYCLOAK_ADMIN_CLIENT_ID,
        clientSecret: process.env.KEYCLOAK_ADMIN_CLIENT_SECRET,
        issuer: `${process.env.KEYCLOAK_ADMIN_HOST}/realms/${process.env.KEYCLOAK_REALM}`
      })
  ],
})