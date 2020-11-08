import { User } from './User'
import { ID } from './index'

export interface Post {
	id: ID
	title: string
	description: string
	published: boolean
	authorId: ID
	postImageUrl: string
	likes: number
	author: User
	comment: Comment[]
	likers: PostsLike[]
	createdAt: string
}
