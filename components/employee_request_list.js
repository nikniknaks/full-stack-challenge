import React from 'react'
import Axios from 'axios'
import RequestFeedback from '~/components/request_feedback.js'

export default class EmployeeRequestList extends React.Component {
	constructor(props) {
		super(props)
    this.getFeedbackRequests = this.getFeedbackRequests.bind(this)
    this.state = {
    	feedback_requests: []
    }
	}

	componentDidMount() {
	  this.getFeedbackRequests()
	}

	getFeedbackRequests() {
		Axios.get('/api/feedback_request/index/' + this.props.negateEmployeeId).then(response => {
			this.setState({
				feedback_requests: response.data
			})
		})
	}

	render() {

		const otherEmployees = this.props.employees.filter(employee => {
			return employee._id !== this.props.negateEmployeeId
		})

		const employeeItems = otherEmployees.map(employee => (
				<li className="row bg-light my-2">
					<span className="col">{employee.last_name}, {employee.first_name};</span>
					<span className="col">{employee.title}</span>
					<RequestFeedback getFeedbackRequests={this.getFeedbackRequests} feedbackRequests={this.state.feedback_requests} subjectEmployeeId={employee._id} negateEmployeeId={this.props.negateEmployeeId} />
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
