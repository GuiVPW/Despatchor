import React from 'react'

import { AppState } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import { VERIFY_TOKEN } from './constants/queries'

import { User } from '../types/User'
import { LayoutDispatch } from '../store/reducers/layout/types'
import { AuthDispatch, AuthState } from '../store/reducers/auth/types'

import { HOME } from './constants/routes'
import PrivateRoute from './components/PrivateRoutes'
import Home from './pages/Home'
import Loading from './components/Loading'

export const App = (): JSX.Element => {
	const { authUser, loading } = useSelector<AppState, AuthState>(store => store.authReducer)

	const dispatchAuth = useDispatch<AuthDispatch>()
	const dispatchLayout = useDispatch<LayoutDispatch>()

	useQuery<{ verifyToken: User }>(VERIFY_TOKEN, {
		onError: e => {
			console.log(e)
			dispatchAuth({ type: 'CHANGE_AUTHENTICATION', payload: null })
		},
		onCompleted: data => {
			if (data) {
				if (authUser === null) {
					dispatchAuth({ type: 'CHANGE_AUTHENTICATION', payload: data.verifyToken })
					dispatchLayout({type: 'CHANGE_NAVBAR', payload: true})
					if (!data.verifyToken.verifiedEmail) {
						alert('Confirme seu email!')
					}
				}
			} else {
				console.log('erro')
				dispatchAuth({ type: 'CHANGE_AUTHENTICATION', payload: null })
			}
		}
	})

	if (loading) return <Loading />

	return (
		<div>
			<Switch>
				<Route exact path={HOME} component={() => <Home authUser={authUser}/>} />
			</Switch>
		</div>
	)
}

export default App
