import { AnyAction, Dispatch } from 'redux'

type Types = 'SELECT_LANG'

type Langs = 'ptBR' | 'enUS'

export interface LangTypes extends AnyAction {
	type: Types
	payload: Langs
}

export type LangDispatch = Dispatch<LangTypes>

export interface LangState {
	locale: Langs
}
