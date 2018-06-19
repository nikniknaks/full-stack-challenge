import React from 'react'
import Axios from 'axios'

export default class RequestFeedback extends React.Component {
	constructor(props) {
		super(props)
    this.requestFeedback = this.requestFeedback.bind(this)
	}

	requestFeedback() {
		console.log('requestFeedback')
		console.log(this.props.employeeId, this.props.negateEmployeeId)
		Axios.post('/api/feedback_request/add', {
			requested_employee_id: this.props.employeeId,
			subject_employee_id: this.props.negateEmployeeId
		})

	}

	render() {
		if (this.props.employeeId) {
			return (
				<button onClick={this.requestFeedback}>Request Feedback</button>
			)
		} else {
			return (
				<span>Feedback Requested</span>
			)
		}
	}
}