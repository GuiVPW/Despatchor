import { gql } from 'apollo-server-express'

export default gql`
	scalar DateTime
	scalar JSON

	directive @auth on FIELD_DEFINITION

	directive @accountOwner on FIELD_DEFINITION
	directive @postOwner on FIELD_DEFINITION
	directive @commentOrPostOwner on FIELD_DEFINITION

	type Query {
		_: String
	}

	type Mutation {
		_: String
	}

	type Subscription {
		_: String
	}
`
