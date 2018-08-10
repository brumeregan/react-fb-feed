import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from './styles.m.css';
import { Consumer } from 'components/HOC/withProfile';

export default class Feed extends Component {
    constructor() {
        super();

        this._updateComment = this._updateComment.bind(this);
        this._submitComment = this._submitComment.bind(this);
        this._submitOnEnter = this._submitOnEnter.bind(this);
        this._handlerFormSubmit = this._handlerFormSubmit.bind(this);
    }

    static propTypes = {
        _createPost: PropTypes.func.isRequired
    };

    state = {
        comment: ''
    };

    _updateComment(event) {
        this.setState({
            comment: event.target.value
        })
    }

    _handlerFormSubmit(event) {
        event.preventDefault();
        this._submitComment()
    }

    _submitOnEnter(event) {
        const enterKey = event.key === 'Enter';

        if(enterKey) {
            this._submitComment();
        }
    }

    _submitComment() {
        const {comment} = this.state;

        if(!comment) {return null}

        this.props._createPost(comment);

        this.setState({
            comment: ''
        });
    }

    render() {
        const { comment } = this.state;
        return (
            <Consumer>
                { (context) => (
                    <section className = { Styles.composer } >
                        <img src = { context.avatar } alt = { context.currentUserFirstName } />

                        <form onSubmit = { this._handlerFormSubmit }>
                            <textarea
                                value = { comment }
                                onChange = { this._updateComment }
                                onKeyPress = { this._submitOnEnter }
                                placeholder = { `What's on your mind, ${context.currentUserFirstName}?` } />
                            <input type = 'submit' value ='Post'/>
                        </form>
                    </section>
                ) }
            </Consumer>
        );
    }
}
