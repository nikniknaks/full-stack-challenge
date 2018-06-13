import React from 'react'

export default class EmployeeList extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		console.log('this.props.employees', this.props.employees);
		const employeeItems = this.props.employees.map(employee => (
				<li>
					<div>{employee.last_name}, {employee.first_name}; {employee.title}</div>
					<a>View Employee</a>
					<a>View Review</a>
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
