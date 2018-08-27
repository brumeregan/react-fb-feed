import React, { Component } from 'react';

import { getUniqueID, delay } from 'instruments';
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import { fromTo } from 'gsap';

import { withProfile } from 'components/HOC/withProfile';
import Spinner from 'components/Spinner';
import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from 'components/StatusBar';
import Postman from 'components/Postman';
import Counter from 'components/Counter';

import Styles from './styles.m.css';
import { api, TOKEN, GROUP_ID } from 'config/api';
import { socket } from 'socket/init';
import Catcher from "../Catcher";

@withProfile
export default class Feed extends Component {
    state = {
        posts: [],
        isSpinning: false,
        isPostman: true,
        isPostman: true
    };

    componentDidMount () {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._fetchPosts();

        socket.emit('join', GROUP_ID);

        socket.on('create', (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);

            if (`${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`) {
                this.setState(({ posts }) => ({
                    posts: [createdPost, ...posts]
                }));
            }
        });

        socket.on('remove', (postJSON) => {
            const { data: removedPost, meta } = JSON.parse(postJSON);

            if (`${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`) {
                this.setState(({ posts }) => ({
                    posts: posts.filter(post => post.id !== removedPost.id)
                }));
            }
        });

        socket.on('like', (postJSON) => {
            const { data: likedPost, meta } = JSON.parse(postJSON);

            if (`${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`) {
                this.setState(({ posts }) => ({
                    posts: posts.map(
                        (post) => post.id === likedPost.id ? likedPost : post)
                }));
            }
        });
    }

    componentWillUnmount () {
        socket.removeListener('create');
        socket.removeListener('remove');
        socket.removeListener('like');
    }

    _setPostsFetchingState = (state) => {
        this.setState({
            isSpinning: state
        });
    }

    _fetchPosts = async () => {

        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: 'GET',
        });

        const { data: posts } = await response.json();

        this.setState({
            posts,
            isSpinning: false
        });
    };

    _createPost = async (comment) => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: TOKEN
            },
            body: JSON.stringify({ comment })
        })

        const { data: post } = await response.json();

        this.setState(({ posts }) => ({
            posts: [post, ...posts],
            isSpinning: false,
        }));
    }

    _deletePost = async (id) => {
        this._setPostsFetchingState(true);
        await fetch(`${api}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: TOKEN
            }
        });

        this.setState(({ posts }) => {
            return {
                posts: posts.filter((post) => post.id !== id),
                isSpinning: false,
            };
        });
    };

     _likePost = async (id) => {
        this._setPostsFetchingState(true);

        const response = await fetch(`${api}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: TOKEN,
            }
        });

        const { data: likedPost } = await response.json();

        this.setState(({ posts }) => ({
            posts: posts.map(
                (post) => post.id === likedPost.id ? likedPost : post),
            isSpinning: false,
        }));
    };

    _animateComposerEnter = (composer) => {
        fromTo(composer,
            1,
            { opacity: 0, rotationX: 50 },
            { opacity: 1, rotationX: 0 });
    };

    _animatePostmanEnter = (postman) => {
        fromTo(postman, 1, { x: 300 }, { x: 0 });
    };

    _animatePostmanEntered = () => {
        setTimeout(() => {
            this.setState(() => ({
                isPostman: false,
            }));
        }, 4000);
    };

    _animatePosmanExit = (postman) => {
        fromTo(postman, 1, { x: 0, opacity: 1 }, { x: 300, opacity: 0 });
    };

    render () {
        const { posts, isSpinning, isPostman } = this.state;
        const postsJSX = posts.map((post) => {
            return (
                <CSSTransition
                    classNames = { {
                        enter: Styles.postInStart,
                        enterActive: Styles.postInEnd,
                        exit: Styles.postOutStart,
                        exitActive: Styles.postOutEnd,
                    } }
                    key = { post.id }
                    timeout = { {
                        enter: 500,
                        exit: 400,
                    } } >
                    <Catcher>
                        <Post
                            { ...post }
                            _deletePost = { this._deletePost }
                            _likePost = { this._likePost } />

                    </Catcher>
                </CSSTransition>
            );
        });

        return (
            <section className = { Styles.feed } >
                <Spinner isSpinning = { isSpinning } />
                <StatusBar />
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this._animateComposerEnter } >
                    <Composer _createPost = { this._createPost }/>
                </Transition>
                <Counter count = { postsJSX.length } />

                <Transition
                    appear
                    in = { isPostman }
                    timeout = { 1000 }
                    onEnter = { this._animatePostmanEnter }
                    onEntered = { this._animatePostmanEntered }
                    onExit = { this._animatePosmanExit } >
                    <Postman />
                </Transition>
                <TransitionGroup>
                    { postsJSX }
                </TransitionGroup>
            </section>
        );
    }
}
