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

	writeReviewModeOn() {
		this.setState({
			'write_review_mode': true
		})
	}

	writeReviewModeOff() {
		this.setState({
			'write_review_mode': false
		})
	}

	submitReview() {
		axios.post('/api/add_review', {
			'employeeId': this.state.employeeId,
			'copy': this.state.copy,
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
			 <form>
			 	<button onClick="writeReviewModeOn()">
			 		Write Review
			 	</button>
			 	<button onClick="submitReview()">
			 		Submit Review
			 	</button>
			 </form>
		 </div>
		)
	}
}