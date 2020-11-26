import React from 'react'
import {
	Theme,
	makeStyles,
	createStyles,
	IconButton,
	Grid,
	Typography,
	Avatar,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Divider
} from '@material-ui/core'

import { FavoriteBorderRounded, ChatBubbleOutlineOutlined } from '@material-ui/icons'

export interface PostType {
	image: string
	userImage: string
	userName: string
	likes: number
	descriptions: string
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		card: {
			width: '100%',
			marginTop: 20,
			paddingBottom: 20
		},
		cardActions: {
			padding: 10,
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'flex-start'
		},
		cardImage: {
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			height: 400
		}
	})
)

const Posts: React.FC<PostType> = ({ image, userImage, userName, likes, descriptions }) => {
	const classes = useStyles()
	return (
		<Grid container item lg={12}>
			<Card className={classes.card}>
				<CardMedia
					title="Post"
					style={{
						backgroundImage: `url(${image})`
					}}
					className={classes.cardImage}
				/>
				<Divider />
				<CardActions className={classes.cardActions}>
					<div>
						<IconButton>
							<FavoriteBorderRounded />
						</IconButton>
						<IconButton>
							<ChatBubbleOutlineOutlined />
						</IconButton>
					</div>
					<div style={{ flexDirection: 'column', cursor: 'pointer' }}>
						<Avatar
							style={{
								backgroundColor: 'orange',
								width: 50,
								height: 50,
								margin: '0 auto'
							}}
							alt="User-Image-SideBar"
						>
							{userImage}
						</Avatar>
						<Typography variant="subtitle2" align="center">
							{userName}
						</Typography>
					</div>
					<div style={{ marginTop: 10 }}>
						<Typography variant="subtitle2" style={{ fontWeight: 800 }}>
							{likes} curtidas
						</Typography>
					</div>
				</CardActions>
				<CardContent style={{ paddingTop: 0 }}>
					<Typography variant="subtitle2" component="p">
						{descriptions}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	)
}

export default Posts
