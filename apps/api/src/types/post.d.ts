export interface Post {
	id: string
	title: string
	description: string | null
	published: boolean
	authorId: string
	postImageUrl: string | null
	likes: number
	createdAt: Date
	updatedAt: Date
}
