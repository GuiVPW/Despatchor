import React from 'react'
import {
	Toolbar,
	Theme,
	makeStyles,
	createStyles,
	Grid,
	Button,
	Container,
	Typography
} from '@material-ui/core'
import { AddCircleOutlineRounded } from '@material-ui/icons'
import { User } from '../../../types/User'

import Post from '../../components/Posts/Post'
import postContent from '../../components/Posts/postsItems'

interface Props {
  authUser: User
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			margin: '20px 0',
			[theme.breakpoints.up('sm')]: {
				marginTop: 0,
				padding: '20px 70px'
			}
		},
		newButton: {
			padding: '20px 30px',
			borderRadius: 50,
			marginBottom: 30
		},
		newButtonText: {
			margin: '0 auto'
		},
		cardActions: {
			padding: 10,
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'flex-start'
		}
	})
)

const AuthenticatedHome = ({ authUser }: Props) => {
	const classes = useStyles()

	console.log(authUser)

	return (
		<Container className={classes.container}>
			<Toolbar />
			<Grid container item>
				<Button variant="outlined" fullWidth className={classes.newButton}>
					<AddCircleOutlineRounded fontSize="large" />
					<Typography variant="h6" className={classes.newButtonText}>
						Crie um Post
					</Typography>
				</Button>
				<Grid container item lg={12}>
					{postContent.map(props =>
						<Post {...props} />
					)}
				</Grid>
			</Grid>
		</Container>
	)
}

export default AuthenticatedHome
