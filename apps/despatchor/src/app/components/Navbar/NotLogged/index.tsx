import React from 'react'
import { Typography } from '@material-ui/core'

interface Props {
	type: 'login' | 'signup'
}

const NotLoggedNavbar = ({ type }: Props): JSX.Element => {
	return (
		<Typography color={type === 'login' ? 'textPrimary' : 'textSecondary'} variant="h3">
			Despatchor
		</Typography>
	)
}

export default NotLoggedNavbar
