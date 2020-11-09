import { combineReducers } from 'redux'

import authReducer from './auth'
import layoutReducer from './layout'
import langReducer from './lang'

export const rootReducer = combineReducers({
	layoutReducer,
	authReducer,
	langReducer
})
