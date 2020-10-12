import transporter from '../config/emailTransporter'
import Mail from './email/email'

interface emailInfo {
  id: number
  email: string
  name: string
}

const sendEmail = async ({ id, email, name }: emailInfo) => {
  await transporter.sendMail({
    from: '"Despatchor"',
    to: email,
    subject: `Olá ${name}! Confirme sua conta.`,
    html: Mail({ id, name })
  })
}

export default sendEmail
