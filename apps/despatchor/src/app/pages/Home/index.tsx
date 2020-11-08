import React from 'react'
import { AuthState } from 'apps/despatchor/src/store/reducers/auth/types'
import AuthenticationForm from '../../components/AuthenticationForm'
import AuthenticatedHome from '../../components/AuthenticatedHome'

interface Props {
	authUser: AuthState['authUser']
}

const Home: React.FC<Props> = ({authUser}) => {
	return authUser ? <AuthenticatedHome authUser={authUser}/> : <AuthenticationForm />
}

export default Home
