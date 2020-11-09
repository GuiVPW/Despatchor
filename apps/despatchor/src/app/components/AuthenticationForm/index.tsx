import { Typography } from '@material-ui/core'

import React from 'react'
import { AuthenticationStyled, BoxStyled} from './Authentication.styled'
import Navbar from '../Navbar'

import { useIntl } from 'react-intl'

const AuthenticationForm = (): JSX.Element => {
	const intl = useIntl()
	return (
		<AuthenticationStyled>
			<Navbar />
			<BoxStyled>
				<Typography variant='h2' color='primary' >
					{intl.formatMessage({
						id: 'login.title'
					})}
				</Typography>
			</BoxStyled>
		</AuthenticationStyled>
	)
}

export default AuthenticationForm
