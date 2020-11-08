import React from 'react'

import { Route, Switch } from 'react-router-dom'
import { HOME } from './constants/routes'

export const App = (): JSX.Element => {
	return (
		<div>
			<Switch>
				<Route component={() => <h1>Top</h1>} exatc path={HOME} />
			</Switch>
		</div>
	)
}

export default App
