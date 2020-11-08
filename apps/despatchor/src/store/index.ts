/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createStore, Store } from 'redux'
import { rootReducer } from './reducers'
import {AuthState} from './reducers/auth/types'
import {LayoutState} from './reducers/layout/types'

export interface AppState {
  authReducer: AuthState,
  layoutReducer: LayoutState
}

const store: Store<AppState> = createStore(
	rootReducer,
	// @ts-ignore
	window.__REDUX_DEVTOOLS_EXTENSION__ &&
		// @ts-ignore
		window.__REDUX_DEVTOOLS_EXTENSION__({
			trace: true
		})
)

export default store
