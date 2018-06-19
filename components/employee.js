import React from 'react'
import Axios from 'axios'

import Review from '~/components/review.js'

import {
  Link
} from 'react-router-dom'

export default class Employee extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			'id': props.match.params.id
		}
		this.getEmployee()
    this.deleteEmployee = this.deleteEmployee.bind(this);
	}

	getEmployee() {
		Axios.get('/api/employee/' + this.state.id).then(response => {
			this.setState(response.data)
		})
	}

	submitReview() {
		Axios.post('/api/add_review', {
			'employeeId': this.state.employeeId,
			'copy': this.state.copy,
		})
	}

	deleteEmployee(event) {
		event.preventDefault()
		Axios.post('/api/employee/delete', {
			employeeId: this.state.id,
		}).then(response => {
			this.getEmployee();
		});
	}

	render() {
		return (
			<div>
				<Link to='/'>Back to Employees</Link>
				<h1>
					Name: {this.state.last_name}, {this.state.first_name}
				</h1>
				<h2>
					Title: {this.state.title}
				</h2>
				<Review id={this.state.id}/>
				<button onClick={this.deleteEmployee}>Remove Employee</button>
		 </div>
		)
	}
}