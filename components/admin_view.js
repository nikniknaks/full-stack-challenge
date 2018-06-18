import React from 'react'
import Employees from '~/components/employees.js'
import Employee from '~/components/employee.js'

import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'

export default class AdminView extends React.Component {
	constructor() {
		super()
	}

	render() {
		return (
			<Route path="/" component={Employees} />
			<Route path="/employee/" component={Employee} />
		)
	}
}
