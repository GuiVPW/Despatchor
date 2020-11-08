import { Post } from './Post'
import { User } from './User'

export interface PostsLike {
	id: string
	post: Post
	user: User
	createdAt: string
}
