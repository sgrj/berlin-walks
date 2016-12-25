import 'leaflet/dist/leaflet.css';
import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import WalksMap from './walks-map';
import walks from './walks';

ReactDOM.render(
  <WalksMap walks={walks}/>,
  document.getElementById('root')
);
