import React, { Component } from 'react';

import Styles from './styles.m.css';
import { Consumer } from 'components/HOC/withProfile';

export default class Feed extends Component {
    render() {
        return (
            <Consumer>
                { (context) => (
                    <section className = { Styles.composer } >
                        <img src = { context.avatar } alt = { context.currentUserFirstName } />

                        <form>
                            <textarea
                                placeholder = { `What's on your mind, ${context.currentUserFirstName}?` } />
                            <input type = 'submit' value ='Post'/>
                        </form>
                    </section>
                ) }
            </Consumer>
        );
    }
}
