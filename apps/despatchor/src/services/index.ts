import { split, ApolloClient, InMemoryCache, from } from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { createUploadLink } from 'apollo-upload-client'

import baseUrl from '../app/constants/apiUrl'

export const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('Authorization')
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	}
})

const wsLink = new WebSocketLink({
	uri: `${baseUrl.replace(/(https|http)/, 'ws')}/graphql`,
	options: {
		reconnect: true
	}
})

const uploadLink = createUploadLink({
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

const link = from([splitLink, authLink])

export const client = new ApolloClient({
	link,
	cache: new InMemoryCache()
})
