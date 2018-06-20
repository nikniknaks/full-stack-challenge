import React from 'react'
import Axios from 'axios'

import { Link } from 'react-router-dom'

import Review from '~/components/review.js'
import EmployeeEdit from '~/components/employee_edit.js'

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

    this.deleteEmployee = this.deleteEmployee.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.saveChanges = this.saveChanges.bind(this)
    this.setEmployeeEditMode = this.setEmployeeEditMode.bind(this)
	}

	getEmployee() {
		Axios.get('/api/employee/' + this.state.id).then(response => {
			this.setState(response.data)
		})
	}

	setEmployeeEditMode() {
		this.setState({employeeEditMode: true})
	}

	submitReview() {
		Axios.post('/api/add_review', {
			'employeeId': this.state.employeeId,
			'copy': this.state.copy,
		})
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value})
	}

	saveChanges(event) {
		Axios.post('/api/employee/update', {
			employeeId: this.state.id,
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			title: this.state.title,
			employeeEditMode: this.state.employeeEditMode,
		}).then(response => {
			this.setState({employeeEditMode: false})
		});
		event.preventDefault()
	}

	deleteEmployee(event) {
		event.preventDefault()
		Axios.post('/api/employee/delete', {
			employeeId: this.state.id,
		}).then(response => {
			this.props.history.push('/') 
		})
	}

	render() {
		return (
		<div className='container'>
			<h1>Employee Profile</h1>
			<div className='container my-3 bg-light'>
				<h2>Personal Info</h2>
				<div>
					Name: {this.state.last_name}, {this.state.first_name}
				</div>
				<div>
					Title: {this.state.title}
				</div>
				<EmployeeEdit handleChange={this.handleChange} saveChanges={this.saveChanges} setEmployeeEditMode={this.setEmployeeEditMode} employeeEditMode={this.state.employeeEditMode}/>
			</div>
			<Review id={this.state.id}/>
			<button className='row' onClick={this.deleteEmployee}>Remove Employee</button>
			<Link className='row' to='/'>Back to Employees </Link>
		</div>
		)
	}
}