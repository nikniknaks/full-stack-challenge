import React from 'react'
import Axios from 'axios'

import { Link } from 'react-router-dom'

import Review from '~/components/review.js'
export default class Employee extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			'id': props.match.params.id,
			'first_name': '',
			'last_name': '',
			'title': '',
			'employeeEditMode': false,
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
			<div className="container">
				<h1>Employee Profile</h1>
				<div className="row">
					<h2 className="col">
						Name: {this.state.last_name}, {this.state.first_name}
					</h2>
					<h2 className="col">
						Title: {this.state.title}
					</h2>
				</div>
				<Review id={this.state.id}/>
				<button onClick={this.deleteEmployee}>Remove Employee</button>
				<Link to='/'>Back to Employees</Link>
		 </div>
		)
	}
}