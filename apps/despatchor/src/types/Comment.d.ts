import { User } from './User'

export interface Comment {
	id: string
	author: User
	comment: string
	createdAt: string
}
