import { Reducer } from 'redux'
import { LayoutState, LayoutTypes } from './types'

const INITIAL_STATES: LayoutState = {
	navbar: false,
	navbarType: 'login',
	footer: true,
	theme: 'lightTheme'
}

const layoutReducer: Reducer<LayoutState, LayoutTypes> = (
	state = INITIAL_STATES,
	{ type, payload }
) => {
	switch (type) {
		case 'TOOGLE_NAVBAR':
			return {
				...state,
				navbar: typeof payload === 'boolean' ? payload : state.navbar
			}
		case 'CHANGE_NAVBAR':
			return {
				...state,
				theme: typeof payload === 'string' ? payload : state.navbarType
			}
		case 'CHANGE_THEME':
			return {
				...state,
				theme: typeof payload === 'string' ? payload : state.navbar
			}
		case 'CHANGE_FOOTER':
			return {
				...state,
				footer: typeof payload === 'boolean' ? payload : state.footer
			}
		default:
			return state
	}
}

export default layoutReducer
