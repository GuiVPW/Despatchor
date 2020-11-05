export interface User {
	id: string
	email: string
	password: string
	name: string | null
	avatarUrl: string | null
	bio: string | null
	verifiedEmail: boolean
	updatedAt: Date
	createdAt: Date
}
