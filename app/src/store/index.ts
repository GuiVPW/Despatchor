import { createStore, Store } from 'redux'
import rootReducer from './reducers'
import { ConstantsState } from './reducers/constants/types'

export interface AppState {
  constants: ConstantsState
}

const store: Store<AppState> = createStore(
  rootReducer,

  //@ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__({
      trace: true
    })
)

export default store
