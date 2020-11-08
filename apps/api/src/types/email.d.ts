export interface EmailSender {
	id: string
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
	id: string
	iat: number
}
