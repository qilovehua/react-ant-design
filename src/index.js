import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Nav from './views/nav'
import News from './views/news/index';
import Thanks from './views/other/thanks';
import About from './views/other/about';
import '../public/main.css';

ReactDOM.render(
    (
        <Router history={browserHistory}>
            <Route path="/" component={Nav}>
                <IndexRoute component={News}/>
                <Route path="/thanks" component={Thanks}/>
                <Route path="/about" component={About}/>
            </Route>
        </Router>
    ),
    document.getElementById('root')
);
