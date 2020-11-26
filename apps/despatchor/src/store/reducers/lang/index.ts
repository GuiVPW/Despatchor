import { Reducer } from 'redux'
import { LangState, LangTypes } from './types'

const INITIAL_STATES: LangState = {
	locale: 'ptBR'
}

const langReducer: Reducer<LangState, LangTypes> = (
	state = INITIAL_STATES,
	{ type, payload }
) => {
	switch (type) {
		case 'SELECT_LANG':
			return {
				locale: typeof payload === 'string' ? payload : state.locale
			}
		default:
			return state
	}
}

export default langReducer
