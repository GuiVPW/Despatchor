export interface EmailSender {
  id: number
  name: string
  email: string
  reason: 'Confirmation' | 'PasswordReset'
}

export interface EmailVerify {
  verifyInput: {
    token: string
    reason: 'Confirmation' | 'PasswordReset'
  }
}

export interface VerifyId {
  id: number
  iat: number
}
