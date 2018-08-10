import React, { Component } from 'react';

import { getUniqueID, delay } from "instruments";
import moment from 'moment';

import Spinner from 'components/Spinner';
import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from 'components/StatusBar';

import Styles from './styles.m.css';


export default class Feed extends Component {
    constructor() {
        super();

        this._createPost = this._createPost.bind(this);
        this._likePost = this._likePost.bind(this);
        this._setPostsFetchingState = this._setPostsFetchingState.bind(this);
        this._deletePost = this._deletePost.bind(this);
    }

    state = {
        posts: [
            {
                id: '123',
                comment: 'Hi there!',
                created: 1451620983,
                likes: [],
            },
            {
                id: '24',
                comment: 'hey hey!',
                created: 1451620900,
                likes: [],
            },
            {
                id: '2444',
                comment: 'hooray!',
                created: 1551620660,
                likes: [],
            }
        ],
        isSpinning: false,
    };

    _setPostsFetchingState(state) {
        this.setState({
            isSpinning: state
        })
    }

    async _createPost(comment) {
        this._setPostsFetchingState(true);

        const post = {
            id: getUniqueID(),
            created: moment().unix(),
            comment,
            likes: []
        };

        await delay(1200);

        this.setState(({posts}) => ({
            posts: [post, ...posts],
            isSpinning: false,
        }));
    }

    async _deletePost(id) {
        this._setPostsFetchingState(true);
        await delay();

        const postToDeleteIdx = this.state.posts.findIndex(post => {
            return post.id === id ? post : false;
        });

        this.setState(({ posts }) => {
            const postsCopy = [...posts];
            postsCopy.splice(postToDeleteIdx, 1);

            return {
                posts: postsCopy,
                isSpinning: false,
            };
        });
    }

    async _likePost(id) {
        this._setPostsFetchingState(true);
        const { currentUserFirstName, currentUserLastName } = this.props;

        await delay(1200);

        const newPosts = this.state.posts.map(post => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id: getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName: currentUserLastName
                        }
                    ],
                };
            }

            return post;
        });

        this.setState({
            posts: newPosts,
            isSpinning: false,
        });
    }

    render() {
        const { posts, isSpinning } = this.state;
        const postsJSX = posts.map((post) => {
            return <Post key = { post.id }
                         { ...post }
                         _deletePost = { this._deletePost }
                         _likePost = { this._likePost } />
        });

        return (
            <section className = { Styles.feed } >
                <Spinner isSpinning = { isSpinning } />
                <StatusBar />
                <Composer _createPost = { this._createPost }/>
                { postsJSX }
            </section>
        );
    }
}
