import { Reducer } from 'redux'
import { LayoutState,LayoutTypes } from './types'

const INITIAL_STATES: LayoutState = {
	navbar: false
}

const layoutReducer: Reducer<LayoutState, LayoutTypes> = (state = INITIAL_STATES, { type, payload }) => {
	switch (type) {
			case 'CHANGE_NAVBAR':
				return {
					...state,
					navbar: typeof payload === 'boolean' ? payload : state.navbar
				}
			default:
				return state
	}
}

export default layoutReducer
