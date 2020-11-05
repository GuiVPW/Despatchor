export interface JWTToken {
	id: string
	email: string
	image: string
	token: string
	emailVerified: boolean
}

export interface LoginPayload {
	email: string
	avatarUrl: string
	name: string
	bio: string
}
