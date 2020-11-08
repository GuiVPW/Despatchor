import { ThemeOptions } from '@material-ui/core'

const drawerWidth = 200

const lightTheme: ThemeOptions = {
	palette: {
		type: 'light',
		common: {
			black: '#0A0A0A',
			white: '#ebf2f5'
		},
		text: {
			primary: '#0A0A0A',
			secondary: '#FAFAFA',
			disabled: '#F2F2F2',
			hint: '#3A3A3A'
		},
		background: { paper: '#ebf2f5' },
		success: { main: '#388E3C' },
		warning: { main: '#f57c00' },
		error: { main: '#d32f2f' },
		info: { main: '#1976d2' },
		primary: {
			main: '#0A0A0A'
		},
		secondary: {
			main: '#FAFAFA'
		}
	},
	typography: {
		fontFamily: '"Segoe-UI"',
		body1: { fontSize: '1.1rem', fontWeight: 500 }
	},
	overrides: {
		MuiTextField: {
			root: {
				color: '#3A3A3A',
				borderBottomColors: '#000000',
				borderWidth: 2,
				fontSize: '1.3rem'
				// textTransform: 'capitalize'
			}
		},
		MuiAppBar: {
			root: {
				zIndex: 1201
			}
		},
		MuiDrawer: {
			paper: {
				width: drawerWidth,
				backgroundColor: '#000',
				color: '#fafafa',
				height: '100%',
				display: 'flex',
				flexDirection: 'column'
			}
		},
		MuiAvatar: {
			colorDefault: {
				backgroundColor: '#EBEBEB',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				color: '#3A3A3A'
				// textTransform: 'uppercase'
			}
		}
	}
}

const darkTheme: ThemeOptions = {
	palette: {
		type: 'dark',
		common: {
			black: '#ebf2f5',
			white: '#0A0A0A'
		},
		text: {
			primary: '#FAFAFA',
			secondary: '#0A0A0A',
			disabled: 'gray',
			hint: '#3A3A3A'
		},
		background: { paper: '#333' },
		success: { main: '#388E3C' },
		warning: { main: '#f57c00' },
		error: { main: '#d32f2f' },
		info: { main: '#1976d2' },
		primary: {
			main: '#FAFAFA'
		},
		secondary: {
			main: '#333'
		}
	},
	typography: {
		fontFamily: '"Segoe-UI"',
		body1: { fontSize: '1.1rem', fontWeight: 500 }
	},
	overrides: {
		MuiTextField: {
			root: {
				color: '#C3C3C3',
				borderBottomColors: '#FFF',
				borderWidth: 2,
				fontSize: '1.3rem'
				// textTransform: 'capitalize'
			}
		},
		MuiAppBar: {
			root: {
				zIndex: 1201
			}
		},
		MuiDrawer: {
			paper: {
				width: drawerWidth,
				backgroundColor: '#FAFAFA',
				color: '#333',
				height: '100%',
				display: 'flex',
				flexDirection: 'column'
			}
		},
		MuiAvatar: {
			colorDefault: {
				backgroundColor: '#EBEBEB',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				color: '#3A3A3A'
				// textTransform: 'uppercase'
			}
		}
	}
}

export default {darkTheme, lightTheme}
