import { split, ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import {createUploadLink} from 'apollo-upload-client'

import baseUrl from '../app/constants/apiUrl'

const token = localStorage.getItem('token')

const wsLink = new WebSocketLink({
	uri: `ws://${baseUrl.split('//')[1]}/graphql`,
	options: {
		reconnect: true
	}
})

const uploadLink = createUploadLink({
	headers: {
		'Authorization': token
	},
	uri: `${baseUrl}/graphql`
})

export const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query)
		return (
			definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
		)
	},
	wsLink,
	uploadLink
)

const link = ApolloLink.from([splitLink])

export const client = new ApolloClient({
	link,
	cache: new InMemoryCache()
})
