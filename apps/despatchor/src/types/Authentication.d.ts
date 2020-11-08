export interface Auth {
	id: string
	email: string
	token: string
	emailVerified: boolean
}


export interface UserInput {
  id?: string
  email?: string
}
