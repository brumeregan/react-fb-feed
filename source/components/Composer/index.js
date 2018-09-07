import React, { Component } from "react";
import PropTypes from "prop-types";
import Styles from "./styles.m.css";

import { withProfile } from "components/HOC/withProfile";

export class Composer extends Component {
    static propTypes = {
        _createPost:          PropTypes.func.isRequired,
        avatar:               PropTypes.string.isRequired,
        currentUserFirstName: PropTypes.string.isRequired,
    };

    state = {
        comment: "",
    };

    _updateComment = (event) => {
        this.setState({
            comment: event.target.value,
        });
    };

    _handlerFormSubmit = (event) => {
        event.preventDefault();
        this._submitComment();
    };

    _submitOnEnter = (event) => {
        const enterKey = event.key === "Enter";

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
            comment: "",
        });
    };

    render () {
        const { comment } = this.state;
        const { avatar, currentUserFirstName } = this.props;

        return (
            <section className = { Styles.composer }>
                <img alt = { currentUserFirstName } src = { avatar } />

                <form onSubmit = { this._handlerFormSubmit }>
                    <textarea
                        placeholder = { `What's on your mind, ${currentUserFirstName}?` }
                        value = { comment }
                        onChange = { this._updateComment }
                        onKeyPress = { this._submitOnEnter }
                    />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}

export default withProfile(Composer);
