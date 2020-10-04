import React from 'react'
import {
  List,
  ListItem,
  Button,
  Theme,
  makeStyles,
  createStyles,
  Typography,
  Avatar,
  Drawer,
  Toolbar,
  Hidden,
  Grid
} from '@material-ui/core'
import { HomeOutlined, AccountBox } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { ConstantsDispatch } from '../../store/reducers/constants/types'
import store from '../../store'

import { Link } from 'react-router-dom'

interface Props {
  open: boolean
  toggleDrawer: (
    bool: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void
}

const drawerWidth = 200

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      height: '100%'
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#000',
      color: '#fff',
      height: '100%'
    },
    drawerContainer: {
      overflow: 'auto'
    },
    drawerContent: {
      height: '100%'
    },
    item: {
      justifyContent: 'center',
      paddingTop: 0
    }
  })
)

const Sidebar: React.FC = () => {
  const storeConstants = store.getState()
  const storeGet: any = useSelector(store => storeConstants.constants)

  const classes = useStyles()

  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleExit = () => {
    window.location.href = '/'
  }

  const handleEnter = () => {
    window.location.href = '/signup'
  }

  return (
    <>
      <Hidden xsDown>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <Toolbar />
          <Grid
            container
            direction="column"
            justify="space-between"
            className={classes.drawerContent}
          >
            <List>
              <ListItem className={classes.item}>
                <Avatar
                  style={{
                    backgroundColor: 'orange',
                    width: 50,
                    height: 50
                  }}
                  alt="User-Image-SideBar"
                >
                  N
                </Avatar>
              </ListItem>
              <ListItem className={classes.item} disableGutters>
                <Typography variant="subtitle1">Vera Vieira</Typography>
              </ListItem>
              <ListItem>
                <Button
                  color="inherit"
                  startIcon={<HomeOutlined />}
                  fullWidth
                  style={{ justifyContent: 'flex-start' }}
                >
                  <Typography variant="subtitle2">Home</Typography>
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  color="inherit"
                  startIcon={<AccountBox />}
                  fullWidth
                  style={{ justifyContent: 'flex-start' }}
                >
                  <Typography variant="subtitle2">Perfil</Typography>
                </Button>
              </ListItem>
            </List>
            <Grid item justify="center">
              {storeGet.isLogged ? (
                <Typography
                  variant="h6"
                  style={{
                    color: '#fff',
                    marginBottom: 20,
                    cursor: 'pointer'
                  }}
                  align="center"
                  onClick={handleExit}
                >
                  Sair
                </Typography>
              ) : (
                <Typography
                  variant="h6"
                  style={{
                    color: '#fff',
                    marginBottom: 20,
                    cursor: 'pointer'
                  }}
                  align="center"
                  onClick={handleEnter}
                >
                  Entrar
                </Typography>
              )}
            </Grid>
          </Grid>
        </Drawer>
      </Hidden>
    </>
  )
}

export default Sidebar
