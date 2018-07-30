import React, {Component} from 'react';

import Styles from './styles.m.css';

export default class Feed extends Component {
    render() {
        const {
            currentUserFirstName,
            avatar } = this.props;

        return (
            <section className = { Styles.composer } >
                <img src = { avatar } alt = { currentUserFirstName }/>

                <form>
                    <textarea
                        placeholder = { `What's on your mind, ${currentUserFirstName}?` } />
                    <input type = 'submit' value ='Post'/>
                </form>
            </section>
        );
    }
}
