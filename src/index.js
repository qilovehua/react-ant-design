import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Nav from './nav'
import News from './news/index';
import '../public/main.css';

ReactDOM.render(
    (
        <Router history={browserHistory}>
            <Route path="/" component={Nav}>
                <IndexRoute component={News}/>
                {/*<Route path="/login" component={Login}/>*/}
            </Route>
        </Router>
    ),
    document.getElementById('root')
);
