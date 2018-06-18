import React from 'react'

export default class Employee extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			'id': props.match.params.id
		}
		this.getEmployee()
	}

	render({ match }) {
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