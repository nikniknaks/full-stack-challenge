import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios'

axios.get('/employees').then(response => {
	const employees = response.data.map(employee => 
		<li>
			<div>{employee.last_name}, {employee.first_name}; {employee.title}</div>
			<a>View Employee</a>
			<a>View Review</a>

		</li>
	);
	const element = (
			<div>
				<h1>Employees</h1>
				<ul>{employees}</ul>
				<div class="addEmployee">
					<h2>Add Employee</h2>
					<label for="firstName">First Name: </label>
					<input name="firstName" type="text"/>
					<label for="lastName">Last Name: </label>
					<input name="lastName" type="text"/>
					<label for="title">Title: </label>
					<input name="title" type="text"/>
					<button>Add</button>
				</div>
			</div>

		)

	ReactDOM.render(
	  element,
	  document.getElementById('root')
	);
})

