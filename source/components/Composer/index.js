import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from './styles.m.css';

import { withProfile } from 'components/HOC/withProfile';

@withProfile
export default class Composer extends Component {
    static propTypes = {
        _createPost: PropTypes.func.isRequired
    };

    state = {
        comment: ''
    };

    _updateComment = (event) => {
        this.setState({
            comment: event.target.value
        });
    };

    _handlerFormSubmit = (event) => {
        event.preventDefault();
        this._submitComment()
    };

    _submitOnEnter = (event) => {
        const enterKey = event.key === 'Enter';

        if (enterKey) {
            this._submitComment();
        }
    };

    _submitComment = () => {
        const { comment } = this.state;

        if (!comment) {
            return null;
        }

        this.props._createPost(comment);

        this.setState({
            comment: ''
        });
    };

    render () {
        const { comment } = this.state;
        const { avatar, currentUserFirstName } = this.props;

        return (
            <section className = { Styles.composer } >
                <img src = { avatar } alt = { currentUserFirstName } />

                <form onSubmit = { this._handlerFormSubmit }>
                    <textarea
                        value = { comment }
                        onChange = { this._updateComment }
                        onKeyPress = { this._submitOnEnter }
                        placeholder = { `What's on your mind, ${currentUserFirstName}?` } />
                    <input type = 'submit' value ='Post'/>
                </form>
            </section>
        );
    }
}
