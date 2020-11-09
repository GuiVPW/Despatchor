import React from 'react'

import { AppState } from 'apps/despatchor/src/store'
import { AuthState } from 'apps/despatchor/src/store/reducers/auth/types'
import { LayoutState } from 'apps/despatchor/src/store/reducers/layout/types'
import { useSelector } from 'react-redux'
import LoggedNavbar from './Logged'
import NotLoggedNavbar from './NotLogged'

const Navbar = (): JSX.Element => {
	const { authUser } = useSelector<AppState, AuthState>(store => store.authReducer)

	const { navbarType } = useSelector<AppState, LayoutState>(store => store.layoutReducer)

	if (authUser !== null) {
		return <LoggedNavbar id={authUser.id} avatarUrl={authUser.avatarUrl} />
	} else {
		return <NotLoggedNavbar type={navbarType}/>
	}
}

export default Navbar
