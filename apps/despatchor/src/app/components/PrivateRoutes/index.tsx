import { User } from 'apps/despatchor/src/types/User'
import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { HOME } from '../../constants/routes'

interface AuthProps {
  authUser: User | null
}

const PrivateRoute: React.FC<AuthProps & RouteProps> = ({ authUser, ...rest }) => {
	if (authUser === null) return <Redirect to={HOME} />
	return <Route {...rest} />
}

export default PrivateRoute
