import React, { Component } from 'react';

import { getUniqueID, delay } from "instruments";
import moment from 'moment';

import { withProfile } from "components/HOC/withProfile";

import Spinner from 'components/Spinner';
import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from 'components/StatusBar';

import Styles from './styles.m.css';


@withProfile
export default class Feed extends Component {
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

    _setPostsFetchingState = (state) => {
        this.setState({
            isSpinning: state
        });
    }

    _createPost = async (comment) => {
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

    _deletePost = async (id) => {
        this._setPostsFetchingState(true);
        await delay();

        const newPosts = this.state.posts.filter(post => {
            return post.id !== id ? post : false;
        });

        this.setState(({ posts }) => {
            return {
                posts: newPosts,
                isSpinning: false,
            };
        });
    }

     _likePost = async (id) => {
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
