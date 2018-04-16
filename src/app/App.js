import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';
import * as routes from '../constants/routes';

import TaskList from '../containters/TaskList/TaskList';
import RegisterPage from '../containters/Register/Register';
import LoginPage from '../containters/Login/Login';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route
                            exact path={routes.LANDING}
                            component={() => <TaskList/>}
                        />
                        <Route
                            exact path={routes.REGISTER}
                            component={() => <RegisterPage/>}
                        />
                        <Route
                            exact path={routes.LOGIN}
                            component={() => <LoginPage/>}
                        />
                        <Route component={NoMatch}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

const NoMatch = ({location}) => (
    <div>
        <h3>
            There is no page with a name <code>{location.pathname}</code>
        </h3>
        <h2>Go to <a href="/">home</a></h2>
    </div>
);

export default App;
