import React from 'react'
import Axios from 'axios'

export default class Employee extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			'id': props.match.params.id
		}
		this.getEmployee()
	}

	getEmployee() {
		Axios.get('/api/employee/' + this.state.id).then(r => {
			this.setState(r.data)
		})
	}

	render() {
		return (
			<div>
				<h1>
					Name: {this.state.last_name}, {this.state.first_name}
				</h1>
				<h2>
					Title: {this.state.title}
				</h2>
		 </div>
		)
	}
}