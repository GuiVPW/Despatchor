import { createStore, Store } from 'redux'
import { RootReducer } from './reducers'
import { ConstantsState } from './reducers/constants/types'

export interface AppState {
  constants: ConstantsState
}
// @ts-ignore
const store: Store<AppState> = createStore(RootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
	trace: true
}))

export default store
