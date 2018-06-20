import React from 'react'
import Axios from 'axios'
import EmployeeRequestList from '~/components/employee_request_list.js'

import { Link } from 'react-router-dom'

export default class Employee extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			'id': props.match.params.id,
			'employees': [],
		}
	  this.getEmployees()
	}

	getEmployees() {
		Axios.get('/api/employees').then(response => {
			this.setState({employees: response.data})
		})
	}

	render() {
		return (
			<div className="container">
				<h3>Requests for Performance Review Feedback</h3>
				<EmployeeRequestList md={8} negateEmployeeId={this.state.id} employees={this.state.employees}/>
				<Link to={"/employee/" + this.state.id} >Back to Employee Profile</Link>
			</div>
		)
	}

}