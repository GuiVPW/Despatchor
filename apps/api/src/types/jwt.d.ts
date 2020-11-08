export interface JWTToken {
	id: string
	email: string
	image: string
	token: string
	emailVerified: boolean
}

export interface JWTTokenPayload {
  readonly id?: string
  email: string
  image: string
  iat: number
  exp: number
}

export interface LoginPayload {
	email: string
	avatarUrl: string
	name: string
	bio: string
}
