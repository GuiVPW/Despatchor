import { useQuery } from '@apollo/client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Route, Switch } from 'react-router-dom'
import { AppState } from '../store'
import {AuthDispatch, AuthState} from '../store/reducers/auth/types'
import { UserInput } from '../types/Authentication'
import { User } from '../types/User'
import PrivateRoute from './components/PrivateRoutes'
import { VERIFY_TOKEN } from './constants/queries'
import { HOME } from './constants/routes'
import Home from './pages/Home'

export const App = (): JSX.Element => {
	const redux = useSelector<AppState, AuthState>(store => store.auth)
	console.log(redux)
	const dispatch = useDispatch<AuthDispatch>()

	const { loading: loadingQuery, error, data } = useQuery(VERIFY_TOKEN)

	if (loadingQuery) return <h1>Loading...</h1>

	if (error) console.log(error)

	if (data) {
		if (redux.authUser === null) {
			dispatch({ type: 'CHANGE_AUTHENTICATION', payload: data.user })
			if (!data.user.verifiedEmail) {
				alert('Verifique seu email')
			}
		}
	} else {
		dispatch({ type: 'CHANGE_AUTHENTICATION', payload: null })
	}



	return (
		<div>
			<Switch>
				<Route exact path={HOME} component={() => <Home authUser={redux.authUser}/>} />
			</Switch>
		</div>
	)
}

export default App
