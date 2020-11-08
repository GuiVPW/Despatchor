import { gql } from '@apollo/client'
export const VERIFY_TOKEN = gql`
	query {
		verifyToken {
			id
			email
			name
			avatarUrl
		}
	}
`
