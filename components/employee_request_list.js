import React from 'react'
import RequestFeedback from '~/components/request_feedback'

export default class EmployeeRequestList extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {

		const otherEmployees = this.props.employees.filter(employee => {
			return employee._id !== this.props.negateEmployeeId
		})

		const employeeItems = otherEmployees.map(employee => (
				<li>
					<div>{employee.last_name}, {employee.first_name}; {employee.title}</div>
					<RequestFeedback />
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
