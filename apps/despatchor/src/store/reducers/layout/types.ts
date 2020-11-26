import { AnyAction, Dispatch } from 'redux'

type Types = 'CHANGE_NAVBAR' | 'TOOGLE_NAVBAR' | 'CHANGE_FOOTER' | 'CHANGE_THEME'

type ThemeType = 'lightTheme' | 'darkTheme'
type NavbarType = 'login' | 'signup' | 'logged'

export interface LayoutTypes extends AnyAction {
	type: Types
	payload: boolean | ThemeType | NavbarType
}

export type LayoutDispatch = Dispatch<LayoutTypes>

export interface LayoutState {
	navbar: boolean
	navbarType: NavbarType | any
	footer: boolean
	theme: ThemeType | any
}

// const theme: Omit<Pick<LayoutState, 'theme'>, 'string'> = { theme: 'light' }
