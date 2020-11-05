import AuthDirective from './auth'
import AccountOwner from './accountOwner'
import CommentOrPostOwnerDirective from './commentOrPostOwner'
import PostOwnerDirective from './postOwner'

export default {
	auth: AuthDirective,
	accountOwner: AccountOwner,
	postOwner: PostOwnerDirective,
	commentOrPostOwner: CommentOrPostOwnerDirective
}
