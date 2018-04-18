import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import './App.css';
import * as routes from '../constants/routes';

import TaskList from '../containters/TaskList/TaskList';
import RegisterPage from '../containters/Register/Register';
import LoginPage from '../containters/Login/Login';

import Header from '../components/Header/Header';

const fetchStateFromLocalStorage = () => {
    const userString = window.localStorage.getItem('user');

    if(!userString) {
        const initialState = {isAuthenticated: false};
        return initialState;
    } else {
        const initialState = JSON.parse(userString);
        return initialState;
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        const initialState = fetchStateFromLocalStorage();

        this.state = initialState

        this.authenticate = this.authenticate.bind(this);
        this.signout = this.signout.bind(this);
    }

    authenticate() {

        const user = {isAuthenticated: true};
        window.localStorage.setItem('user', JSON.stringify(user))

        this.setState(user)
    }

    signout() {

        window.localStorage.removeItem('user')
        this.setState({isAuthenticated: false})
    }

    render() {


        return (
            <Router>
                <div>
                <Header redirect={this.state.isAuthenticated} handleSingOut={this.signout}/>
                    <Switch>
                        <PrivateRoute
                            exact path={routes.LANDING}
                            component={ TaskList}
                            isAuthenticated={this.state.isAuthenticated}
                        />
                        <Route
                            exact path={routes.REGISTER}
                            render={props => <RegisterPage handleLogin={this.authenticate} redirect={this.state.isAuthenticated}/> }
                        />
                        <Route
                            exact path={routes.LOGIN}
                            render={props => <LoginPage handleLogin={this.authenticate} redirect={this.state.isAuthenticated} />}
                        />
                        <Route component={NoMatch}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => isAuthenticated ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )}
        />
    );
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
