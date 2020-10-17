import { createTransport } from 'nodemailer'
import dotenv from 'dotenv'

import oauth2Client from './google-api'
import mail from '../utils/email/email'

dotenv.config()

interface EmailSender {
  id: number
  name: string
  email: string
}

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
