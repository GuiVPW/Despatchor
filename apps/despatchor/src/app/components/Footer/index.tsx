import { Button } from '@material-ui/core'
import React from 'react'

import { LangDispatch} from 'apps/despatchor/src/store/reducers/lang/types'
import { useDispatch } from 'react-redux'


const Footer = () => {
	const dispatchLang = useDispatch<LangDispatch>()

	const handleChange = (lang: 'ptBR'|'enUS') => {
		dispatchLang({type:'SELECT_LANG', payload: lang})
	}

	return (
		<div>
			<Button variant='contained' onClick={() => handleChange('enUS')}>Mudar para o inglês</Button>
			<br />
			<br/>
			<Button variant='contained' onClick={() => handleChange('ptBR')}>Mudar para o português</Button>
		</div>
	)
}

export default Footer
