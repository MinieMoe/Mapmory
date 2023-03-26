require('dotenv').config
const { OAuth2Client } = require('google-auth-library')

/**
 * @description Function to decode Google OAuth token
 * @param token: string
 * @returns payload object - decoded Google ID token
 */

const getVerifiedAndDecodedOAuthJWTGoogle = async token => {

  const CLIENT_ID_GOOGLE = process.env.CLIENT_ID_GOOGLE

  try {
    const client = new OAuth2Client(CLIENT_ID_GOOGLE)

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID_GOOGLE,
    })

    return ticket

  } catch (error) {
    return { status: 500, data: error }
  }
}

module.exports = { getVerifiedAndDecodedOAuthJWTGoogle }