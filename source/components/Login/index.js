import React, { Component } from 'react';

import Styles from './styles.m.css';

import { withProfile } from 'components/HOC/withProfile';

import { Link } from 'react-router-dom'

@withProfile
export default class Login extends Component {
    render () {
        const { _login } = this.props;
        console.log('login compoennt', this.props);

        return (
            <button onClick = { _login }>Login</button>
        );
    }
}
