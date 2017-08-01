import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Welcome from './Welcome'
import App from './App';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(
    <Welcome name="react"/>,
    document.getElementById('root')
)