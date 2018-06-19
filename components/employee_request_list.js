import React from 'react'
import Axios from 'axios'
import RequestFeedback from '~/components/request_feedback.js'

export default class EmployeeRequestList extends React.Component {
	constructor(props) {
		super(props)
    this.getFeedbackRequests = this.getFeedbackRequests.bind(this)
	}

	componentDidMount() {
	  this.getFeedbackRequests()
	}

	getFeedbackRequests() {
		Axios.get('/api/feedback_request/index/' + this.props.negateEmployeeId).then(response => {
			console.log('getFeedbackRequests response: ', response)
		})
	}

	render() {

		const otherEmployees = this.props.employees.filter(employee => {
			return employee._id !== this.props.negateEmployeeId
		})

		const employeeItems = otherEmployees.map(employee => (
				<li>
					<div>{employee.last_name}, {employee.first_name}; {employee.title}</div>
					<RequestFeedback employeeId={employee._id} negateEmployeeId={this.props.negateEmployeeId} />
				</li>
			)
		)

		return (
			<ul>
				{employeeItems}
			</ul>
		)
	}
}
