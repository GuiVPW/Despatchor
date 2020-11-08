import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'

import { BrowserRouter } from 'react-router-dom'

import App from './app/app'
import './style.css'
import { ApolloProvider } from '@apollo/client'
import { client } from './services'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ApolloProvider client={client}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ApolloProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
