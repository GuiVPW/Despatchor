import { Reducer } from 'redux'
import { AuthState, AuthTypes } from './types'

const INITIAL_STATES: AuthState = {
	authUser: null,
	loading: true
}

const authReducer: Reducer<AuthState, AuthTypes> = (
	state = INITIAL_STATES,
	{ type, payload }
) => {
	switch (type) {
		case 'CHANGE_AUTHENTICATION':
			return {
				authUser: payload,
				loading: false
			}
		default:
			return state
	}
}

export default authReducer
