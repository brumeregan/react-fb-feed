import React, { Component } from 'react';

import Spinner from 'components/Spinner';
import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from 'components/StatusBar';

import Styles from './styles.m.css';

export default class Feed extends Component {
    state = {
        posts: [
            {
                id: 123,
                comment: 'Hi there!',
                created: 1451620983
            },
            {
                id: 24,
                comment: 'hey hey!',
                created: 1451620900
            },
            {
                id: 2444,
                comment: 'hooray!',
                created: 1551620660
            }
        ],
        isSpinning: true
    };

    render() {
        const { posts, isSpinning } = this.state;

        const postsJSX = posts.map((post) => {
            return <Post key = { post.id } { ...post } />
        });


        return (
            <section className = { Styles.feed } >
                <Spinner isSpinning = { isSpinning } />
                <StatusBar />
                <Composer />
                { postsJSX }
            </section>
        );
    }
}
