import { google } from 'googleapis'
import { config } from 'dotenv-safe'

config()

const oauth2Client = new google.auth.OAuth2(
  process.env.OAUTH2_CLIENTID,
  process.env.OAUTH2_SECRET
)

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH2_REFRESHTOKEN
})

export default oauth2Client
