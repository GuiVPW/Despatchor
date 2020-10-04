import { AnyAction, Dispatch } from 'redux'

type Types = 'CHANGE_SIDEBAR' | 'CHANGE_NAVBAR'

export type Which = 'NONE' | 'LOGGED' | 'DESLOGGED' | 'ADMIN'

export interface ConstantsTypes extends AnyAction {
  type: Types
  payload: boolean | Which
}

export type ConstantsDispatch = Dispatch<ConstantsTypes>

export interface ConstantsState {
  isLogged: boolean
  sidebar: Which
  navbar: Which
}
