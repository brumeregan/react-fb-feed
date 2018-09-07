import React, { Component } from "react";

import Styles from "./styles.m.css";

import { withProfile } from "components/HOC/withProfile";

@withProfile
export default class Login extends Component {
    render () {
        const { _login } = this.props;

        return (
            <div className = { Styles.login }>
                <button onClick = { _login }>Login</button>
            </div>
        );
    }
}
