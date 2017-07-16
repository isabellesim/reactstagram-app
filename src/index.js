import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Login from './Login';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Profile from './Profile';


ReactDOM.render((
    <BrowserRouter>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
        </div>
    </BrowserRouter>
), document.getElementById('root'))

registerServiceWorker();
