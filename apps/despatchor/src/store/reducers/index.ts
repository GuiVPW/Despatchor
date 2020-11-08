import { combineReducers } from 'redux'

import authReducer from './auth'
import layoutReducer from './layout'

export const rootReducer = combineReducers({
	layoutReducer,
	authReducer
})
