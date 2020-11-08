import { AnyAction, Dispatch } from 'redux'

type Types = 'CHANGE_NAVBAR'

export interface ConstantsTypes extends AnyAction {
  type: Types
  payload: boolean
}

export type ConstantsDispatch = Dispatch<ConstantsTypes>

export interface ConstantsState {
  navbar: boolean
}
