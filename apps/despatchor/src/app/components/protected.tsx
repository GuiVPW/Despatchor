import React, { Component } from 'react'
import {Redirect, Route} from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('Authorization')
	return (
		<Route
			{...rest}
			render={props =>
				 ? (
					<Component {...props} />
				) : (
					<Redirect to='/login' />
				)
			}
		/>
	)
}
