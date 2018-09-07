// Core
import React, { Component } from "react";
import { hot } from "react-hot-loader";
import avatar from "theme/assets/lisa";

import { Route, Switch, Redirect } from "react-router-dom";

import { Provider } from "components/HOC/withProfile";
import Catcher from "components/Catcher";

import Feed from "components/Feed";
import Profile from "components/Profile";
import StatusBar from "components/StatusBar";
import Login from "components/Login";

const options = {
    avatar,
    currentUserFirstName: "Оксана",
    currentUserLastName:  "Боярко",
};

@hot(module)
export default class App extends Component {
    state = {
        isAuthenticated: false,
    };

    componentDidMount () {
        const auth = JSON.parse(localStorage.getItem("lectrum-auth"));

        if (auth && auth.isAuth) {
            this.setState(() => ({
                isAuthenticated: auth,
            }));
        } else {
            localStorage.setItem(
                "lectrum-auth",
                JSON.stringify({ isAuth: false })
            );
        }
    }

    _login = () => {
        this.setState({
            isAuthenticated: true,
        });

        localStorage.setItem("lectrum-auth", JSON.stringify({ isAuth: true }));
    };

    _logout = () => {
        this.setState({
            isAuthenticated: false,
        });

        localStorage.removeItem("lectrum-auth");
    };

    render () {
        const { isAuthenticated } = this.state;

        const privateComponents = (
            <>
                <StatusBar _logout = { this._logout } />
                <Switch>
                    <Route component = { Feed } path = '/feed' />
                    <Route component = { Profile } path = '/profile' />
                    <Redirect to = '/feed' />
                </Switch>
            </>
        );

        const publicComponent = (
            <Switch>
                <Route
                    path = '/login'
                    render = { () => {
                        return <Login _login = { this._login } />;
                    } }
                />
                <Redirect to = '/login' />
            </Switch>
        );
        const screen = isAuthenticated ? privateComponents : publicComponent;

        return (
            <Catcher>
                <Provider value = { options }>{screen}</Provider>
            </Catcher>
        );
    }
}
