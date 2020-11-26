import { createTransport } from 'nodemailer'
import { config } from 'dotenv-safe'
import * as jwt from 'jsonwebtoken'
import oauth2Client from './google-api'

import confirmationEmail from '../utils/emails/emailConfirmation'
import resetPasswordEmail from '../utils/emails/emailReset'
import { EmailSender } from '../types/email'

config()

const sendEmail = async ({ email, id, name, reason }: EmailSender): Promise<void> => {
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

	const token = jwt.sign(
		{ id },
		reason === 'Confirmation' ? process.env.SECRET : process.env.RESET_SECRET
	)

	if (reason === 'Confirmation') {
		smtpTransport.sendMail(
			{
				from: '"Despatchor"',
				to: email,
				subject: `Olá ${name}! Confirme sua conta.`,
				html: confirmationEmail({ token, name })
			},
			err => {
				if (err) {
					console.log('err', err)
					return false
				} else {
					return true
				}
			}
		)
	} else if (reason === 'PasswordReset') {
		smtpTransport.sendMail(
			{
				from: '"Despatchor"',
				to: email,
				subject: `Olá ${name}! Altere sua senha.`,
				html: resetPasswordEmail({ token, name })
			},
			err => {
				if (err) {
					console.log(err)
					return false
				} else {
					return true
				}
			}
		)
	}
}

export default sendEmail
