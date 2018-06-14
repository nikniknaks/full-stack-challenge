import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'

import AdminView from './components/admin_view.js'
import EmployeeView from './components/employee_view.js'
import Reviews from './components/reviews.js'
import Review from './components/review.js'

ReactDOM.render(
	(<BrowserRouter>
    <AdminView />
  </BrowserRouter>),
  document.getElementById('root')
);

