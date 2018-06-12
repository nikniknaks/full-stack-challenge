import React from 'react';
import ReactDOM from 'react-dom';

const element = (
		<div>
			<h1>Employees</h1>
		</div>
	)

import axios from 'axios'

axios.get('/employees').then(response => {
	ReactDOM.render(
	  element,
	  document.getElementById('root')
	);
})

