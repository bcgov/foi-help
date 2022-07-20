// This file contains all functions necessary for IDIR integration via Keycloak


    // url = '{0}/auth/realms/{1}/protocol/openid-connect/token'.format(os.getenv('KEYCLOAK_ADMIN_HOST'),os.getenv('KEYCLOAK_ADMIN_REALM'))        


// https://stackoverflow.com/questions/65365978/next-js-protect-routes-which-use-static-site-generation

export async function getIDIRAuthHeader() {
    const url = `${process.env.KEYCLOAK_ADMIN_HOST}/auth/realms/${process.env.KEYCLOAK_ADMIN_REALM}/protocol/openid-connect/token`
}