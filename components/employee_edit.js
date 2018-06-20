import React from 'react'

export default class EmployeeEdit extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			'id': props.id,
			'first_name': '',
			'last_name': '',
			'title': '',
		}
	}

	render() {
		if (this.props.employeeEditMode === true) {
				return (<form onSubmit={this.props.saveChanges} className="container">
						<div className="row">
							<div className="col">
								<label for="first_name">First Name: </label>
								<input type="text" name="first_name" value={this.state.value} onChange={this.props.handleChange} />
							</div>
							<div className="col">
								<label for="last_name">Last Name: </label>
								<input type="text" name="last_name" value={this.state.value} onChange={this.props.handleChange} />
							</div>
							<div className="col">
								<label for="title">Title: </label>
								<input type="text" name="title" value={this.state.value} onChange={this.props.handleChange} />
							</div>
						</div>

						<div className="row">
							<button className="col-2 offset-1" type="submit" value="Submit">Save Changes</button>
						</div>
					</form>)
		} else {
			return (
				<button onClick={this.props.setEmployeeEditMode}>Edit Employee Details</button>
			)
		}
	}
}