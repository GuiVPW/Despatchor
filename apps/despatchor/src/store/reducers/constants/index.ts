import { Reducer } from 'redux'
import { ConstantsTypes, ConstantsState } from './types'

const INITIAL_STATES: ConstantsState = {
	navbar: false
}

const constantsReducer: Reducer<ConstantsState, ConstantsTypes> = (state = INITIAL_STATES, { type, payload }) => {
	switch (type) {
			case 'CHANGE_NAVBAR':
				return {
					...state,
					navbar: typeof payload === 'string' ? payload : state.navbar
				}
			default:
				return state
	}
}

export default constantsReducer
