import React from 'react'
import { AuthState } from 'apps/despatchor/src/store/reducers/auth/types'
import AuthenticationForm from '../../components/AuthenticationForm'
import AuthenticatedHome from '../../components/AuthenticatedHome'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core'

interface Props {
  authUser: AuthState['authUser']
}

const theme = createMuiTheme()

const Home: React.FC<Props> = ({authUser}) => {
	return authUser ?
		<AuthenticatedHome authUser={authUser} />
	 :
		<MuiThemeProvider theme={theme}>
			<AuthenticationForm />
		</MuiThemeProvider>

}

export default Home
