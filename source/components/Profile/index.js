import React, { Component } from 'react';

import { withProfile } from 'components/HOC/withProfile';

import Styles from './styles.m.css';


@withProfile
export default class Profile extends Component {
    render() {
        const { currentUserFirstName, currentUserLastName, avatar } = this.props;


        return (
            <section className = { Styles.Profile }>
                <h1>
                    Welcome, { currentUserFirstName } {currentUserLastName}!
                </h1>

                <img src = { avatar } alt = { currentUserFirstName } />

            </section>
        );
    }
}
