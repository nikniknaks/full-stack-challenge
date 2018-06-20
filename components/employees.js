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
		axios.get('/api/employees').then(response => {
			this.setState({employees: response.data})
		})
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	addEmployee(event) {
		axios.post('/api/employee/add', {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      title: this.state.title,
		}).then(v => {
			this.getEmployees()
		}).catch(v => {
			console.error(v)
		});
		event.preventDefault()
	}

	render() {
		return (
			<div className="container">
				<h1>Employees</h1>
				<EmployeeList employees={this.state.employees}/>
				<div >
				<h2 className="row">Add Employee</h2>
					<form onSubmit={this.addEmployee} className="addEmployee">
						<div className="row">
							<label className="col" for="first_name">First Name: </label>
							<input className="col" name="first_name" type="text" value={this.state.value} onChange={this.handleChange}/>
							<label className="col" for="last_name">Last Name: </label>
							<input className="col" name="last_name" type="text" value={this.state.value} onChange={this.handleChange}/>
							<label className="col" for="title">Title: </label>
							<input className="col" name="title" type="text" value={this.state.value} onChange={this.handleChange}/>
						</div>
						<button className="row" type="submit" value="Submit">Add</button>
					</form>
				</div>
			</div>
		)
	}
}