import React from 'react'
import Axios from 'axios'

export default class RequestFeedback extends React.Component {
	constructor(props) {
		super(props)
    this.requestFeedback = this.requestFeedback.bind(this)
	}

	requestFeedback() {
		Axios.post('/api/feedback_request/add', {
			requested_employee_id: this.props.subjectEmployeeId,
			subject_employee_id: this.props.negateEmployeeId
		}).then(r => {
			this.props.getFeedbackRequests()
		})
	}

	checkRequested() {
		return this.props.feedbackRequests.find(v => v.requested_employee_id === this.props.subjectEmployeeId)
	}

	render() {
		if (this.checkRequested()) {
			return (
				<span className="col text-success">Feedback Requested</span>
			)
		} else {
			return (
				<span className="col">
					<button onClick={this.requestFeedback}>Request Feedback</button>
				</span>
			)
		}
	}
}