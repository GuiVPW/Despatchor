import React from 'react'

import { AppState } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import { VERIFY_TOKEN } from './constants/queries'

import { User } from '../types/User'
import { LayoutDispatch, LayoutState } from '../store/reducers/layout/types'
import { AuthDispatch, AuthState } from '../store/reducers/auth/types'

import { HOME } from './constants/routes'
import Home from './pages/Home'
import Loading from './components/Loading'

import { MuiThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core'
import themes from './constants/theme'

import { IntlProvider } from 'react-intl'
import langs from '../lang'
import { LangState } from '../store/reducers/lang/types'
import Footer from './components/Footer'

export const App = (): JSX.Element => {
	const { authUser, loading } = useSelector<AppState, AuthState>(store => store.authReducer)
	const { theme } = useSelector<AppState, LayoutState>(store => store.layoutReducer)
	const { locale } = useSelector<AppState, LangState>(store => store.langReducer)

	const dispatchAuth = useDispatch<AuthDispatch>()
	const dispatchLayout = useDispatch<LayoutDispatch>()

	const MuiTheme = createMuiTheme(theme === 'lightTheme' ? themes.lightTheme : themes.darkTheme)

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
		<MuiThemeProvider theme={MuiTheme}>
			<IntlProvider messages={langs[locale]} locale="pt-BR" defaultLocale="pt-BR">
				<CssBaseline />
				<Switch>
					<Route exact path={HOME} component={() => <Home authUser={authUser} />} />
				</Switch>
				<Footer />
			</IntlProvider>
		</MuiThemeProvider>
	)
}

export default App
