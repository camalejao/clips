import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Navbar from './components/Navbar';
import Routes from './Routes';

ReactDOM.render(
  <div>
    <Navbar />
    <div className="container-sm">
      <Routes />
    </div>
  </div>,
  document.getElementById('root')
);

