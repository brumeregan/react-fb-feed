import React, { Component } from 'react';
import moment from 'moment';
import Styles from './styles.m.css';
import { Consumer } from 'components/HOC/withProfile';
import { func, string, number, array } from 'prop-types';

import Like from 'components/Like';


export default class Post extends Component {
    static propTypes = {
        _likePost: func.isRequired,
        comment: string.isRequired,
        likes: array.isRequired,
        _deletePost: func.isRequired,
    };

    constructor() {
        super();

        this._deletePost = this._deletePost.bind(this);
    }

    _deletePost() {
        const { _deletePost, id } = this.props;
        _deletePost(id);
    }


    render() {
        const { comment, created, _likePost, id, likes } = this.props;

        return (
            <Consumer>
                { (context) => (
                    <section className = { Styles.post } >
                        <span className = { Styles.cross } onClick = { this._deletePost } ></span>
                        <img src = { context.avatar } />
                        <a>{ context.currentUserFirstName } { context.currentUserLastName }</a>
                        <time>{ moment.unix(created).format('MMMM D h:mm:ss a') }</time>
                        <p>{ comment }</p>

                        <Like _likePost = { _likePost }
                              id = { id }
                              likes = { likes }
                              { ...context } />
                    </section>
                )}
            </Consumer>
        );
    }
}
