import React from 'react'
import EmployeeList from './employee_list.js'

import axios from 'axios'

export default class Employees extends React.Component {
	constructor() {
		super()
    this.addEmployee = this.addEmployee.bind(this)
    this.state = {
    	employees: []
    }
	}
	componentDidMount() {
	  this.getEmployees()
	}
	getEmployees() {
		axios.get('/employees').then(response => {
			this.setState({employees: response.data})
			console.log('this.state.employees', this.state.employees)
		})
	}
	addEmployee(event) {
			.input.value
		console.log(this)
		event.preventDefault()
	}
	render() {
		return (
			<div>
				<h1>Employees</h1>
				<EmployeeList employees={this.state.employees}/>
				<form onSubmit={this.addEmployee} class="addEmployee">
					<h2>Add Employee</h2>
					<label for="firstName">First Name: </label>
					<input name="firstName" type="text" ref={input => this.firstName = input} />
					<label for="lastName">Last Name: </label>
					<input name="lastName" type="text" ref={input => this.lastName = input} />
					<label for="title">Title: </label>
					<input name="title" type="text" ref={input => this.title = input} />
					<button type="submit" value="Submit">Add</button>
				</form>
			</div>
		)
	}
}