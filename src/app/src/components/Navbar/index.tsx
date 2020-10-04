import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  Button,
  MenuItem,
  Theme,
  makeStyles,
  createStyles,
  IconButton,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { ConstantsDispatch } from '../../store/reducers/constants/types'
import store from '../../store'

import {
  AccountBox,
  AccountCircleOutlined,
  ExitToApp,
  Settings
} from '@material-ui/icons'
import { Link } from 'react-router-dom'

const logado = true

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      background: '#000',
      zIndex: theme.zIndex.drawer + 1
    },
    appBarContent: {
      width: '100%',
      maxWidth: 1920,
      padding: '0 15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerContainer: {
      overflow: 'auto'
    }
  })
)

const Navbar = () => {
  const storeConstants = store.getState()
  const storeGet: any = useSelector(store => storeConstants.constants)

  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const dispatch = useDispatch<ConstantsDispatch>()

  if (storeGet.isLogged) {
    dispatch({
      type: 'CHANGE_SIDEBAR',
      payload: 'DESLOGGED'
    })
  }

  const handleClickCreate = () => {
    window.location.href = '/create'
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} elevation={0}>
        <Toolbar className={classes.appBarContent}>
          <Typography variant="h4" color="inherit">
            Despatchor
          </Typography>
          {storeGet.isLogged ? (
            <div>
              <Button onClick={handleClickCreate} color="inherit">
                Criar Post
              </Button>
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                <AccountCircleOutlined />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <AccountBox />
                  </ListItemIcon>
                  <ListItemText primary="Perfil" />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary="Configurações" />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText primary="Sair" />
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to="/login" color="inherit">
              Entrar
            </Link>
          )}
          {/* <Sidebar /> */}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
