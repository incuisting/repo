import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Welcome from './Welcome'

import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(
    <Welcome name="react"/>,
    document.getElementById('root')
)
