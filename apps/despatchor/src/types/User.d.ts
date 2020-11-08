import {Post} from './Post'
import { Comment } from './Comment'

export interface User {
	id: string
	email: string
	name: string
	avatarUrl?: string
	bio?: string
	posts?: Post[]
	comments?: Comment[]
	verifiedEmail: boolean
	createdAt: string
}
