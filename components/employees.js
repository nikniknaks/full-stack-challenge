import React from 'react'
import EmployeeList from '~/components/employee_list.js'

import axios from 'axios'

export default class Employees extends React.Component {

	constructor() {
		super()
    this.addEmployee = this.addEmployee.bind(this)
    this.handleChange = this.handleChange.bind(this);

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
		})
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	addEmployee(event) {
		axios.post('/employee/add', {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      title: this.state.title,
		}).then(v => {
			this.getEmployees();
		}).catch(v => {
			console.error(v);
		});
		event.preventDefault()
	}

	render() {
		return (
			<div>
				<h1>Employees</h1>
				<EmployeeList employees={this.state.employees}/>
				<form onSubmit={this.addEmployee} class="addEmployee">
					<h2>Add Employee</h2>
					<label for="first_name">First Name: </label>
					<input name="first_name" type="text" value={this.state.value} onChange={this.handleChange}/>
					<label for="last_name">Last Name: </label>
					<input name="last_name" type="text" value={this.state.value} onChange={this.handleChange}/>
					<label for="title">Title: </label>
					<input name="title" type="text" value={this.state.value} onChange={this.handleChange}/>
					<button type="submit" value="Submit">Add</button>
				</form>
			</div>
		)
	}
}