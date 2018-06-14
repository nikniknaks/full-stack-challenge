import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'

import AdminView from './components/admin_view.js'

ReactDOM.render(
	(<BrowserRouter>
    <AdminView />
  </BrowserRouter>),
  document.getElementById('root')
);

