import { createTransport } from 'nodemailer'
import { google } from 'googleapis'
import mail from '../utils/email/email'
import dotenv from 'dotenv'

dotenv.config()

interface EmailSender {
  id: number
  name: string
  email: string
}

const oauth2Client = new google.auth.OAuth2(
  process.env.OAUTH2_CLIENTID,
  process.env.OAUTH2_SECRET
)

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH2_REFRESHTOKEN
})

const sendEmail = async ({
  email,
  id,
  name
}: EmailSender): Promise<boolean | void> => {
  const { token: accessToken } = await oauth2Client.getAccessToken()

  const smtpTransport = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_USER,
      clientId: process.env.OAUTH2_CLIENTID,
      clientSecret: process.env.OAUTH2_SECRET,
      refreshToken: process.env.OAUTH2_REFRESHTOKEN,
      accessToken
    }
  })

  smtpTransport.sendMail(
    {
      from: '"Despatchor"',
      to: email,
      subject: `Olá ${name}! Confirme sua conta.`,
      html: mail({ id, name })
    },
    err => {
      if (err) {
        console.log(err)
        return false
      }
    }
  )
}

export default sendEmail
