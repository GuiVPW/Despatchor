import { AnyAction, Dispatch } from 'redux'
import { User } from '../../../types/User'

type Types = 'CHANGE_AUTHENTICATION'

export interface AuthTypes extends AnyAction {
	type: Types
	payload: any
}

export type AuthDispatch = Dispatch<AuthTypes>

export interface AuthState {
	authUser: User | null
	loading: boolean
}
