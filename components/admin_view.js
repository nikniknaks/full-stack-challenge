import React from 'react'
import Employees from '~/components/employees.js'
import Employee from '~/components/employee.js'
import FeedbackRequest from '~/components/feedback_request.js'

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
			<div>
				<Route path="/employee/:id" component={Employee} />
				<Route path="/feedback_request/:id" component={FeedbackRequest} />
				<Route exact path="/" component={Employees} />
			</div>
		)
	}
}
