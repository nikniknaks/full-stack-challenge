import React from 'react'

export default class EmployeeList extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const employeeItems = this.props.employees.map(employee => (
				<li>
					<div>{employee.last_name}, {employee.first_name}; {employee.title}</div>
					<a href={'employee/' + employee._id}>View/Edit Employee</a>
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
