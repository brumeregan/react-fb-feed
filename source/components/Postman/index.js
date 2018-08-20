// Core
import React from 'react';

// Instruments
import Styles from './styles.m.css';
import { withProfile } from 'components/HOC/withProfile';

const Postman = ({ avatar, currentUserFirstName }) => (
    <section className = { Styles.postman }>
        <img src = { avatar } />
        <span>
            Welcome online, <b>{ currentUserFirstName }</b>!
        </span>
    </section>
);

export default withProfile(Postman);
