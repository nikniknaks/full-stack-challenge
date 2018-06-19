import React from 'react'
import Axios from 'axios'
import EmployeeRequestList from '~/components/employee_request_list.js'

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
			<div>
				<EmployeeRequestList negateEmployeeId={this.state.id} employees={this.state.employees}/>
			</div>
		)
	}

}