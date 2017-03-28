import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory, Link, History} from 'react-router';
import App from './App';
import '../public/main.css';

ReactDOM.render((
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={App}/>
                {/*<Route path="/login" component={Login}/>*/}
            </Route>
        </Router>
    ), document.getElementById('root')
);
