/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createStore, Store } from 'redux'
import { rootReducer } from './reducers'
import {AuthState} from './reducers/auth/types'
import {LayoutState} from './reducers/layout/types'

export interface AppState {
  auth: AuthState,
  layout: LayoutState
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
