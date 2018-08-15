// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import avatar from 'theme/assets/lisa';

import { Provider } from 'components/HOC/withProfile';
import Catcher from 'components/Catcher';

import Feed from 'components/Feed';
const options = {
    avatar,
    currentUserFirstName: 'Оксана',
    currentUserLastName: 'Боярко'
};

@hot(module)
export default class App extends Component {
    render () {
        return (
            <Catcher>
                <Provider value = { options }>
                    <Feed { ...options } />
                </Provider>
            </Catcher>
        );
    }
}
