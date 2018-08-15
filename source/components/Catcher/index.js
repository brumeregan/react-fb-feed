import React, { Component } from 'react';

import { object } from 'prop-types';
import Styles from './styles.m.css';

export default class Catcher extends Component {

    static propTypes = {
        children: object.isRequired
    };

    state = {
        error: false
    };

    componentDidCatch (error, stack) {
        this.setState({
            error: true
        });
    }

    render () {
        if (this.state.error) {
            return <section className={Styles.catcher}><span>Something has happened......</span></section>
        }

        return this.props.children;
    }
}
