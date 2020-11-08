import { AnyAction, Dispatch } from 'redux'

type Types = 'CHANGE_NAVBAR'

export interface LayoutTypes extends AnyAction {
  type: Types
  payload: boolean
}

export type LayoutDispatch = Dispatch<LayoutTypes>

export interface LayoutState {
  navbar: boolean
}
