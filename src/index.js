import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'
import 'rodal/lib/rodal.css';

import App from './app/App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
