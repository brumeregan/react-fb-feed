// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import avatar from 'theme/assets/lisa';

import { Provider } from 'components/HOC/withProfile';

import Feed from 'components/Feed';
const options = {
    avatar,
    currentUserFirstName: 'Lisa',
    currentUserLastName: 'Simpson'
};

@hot(module)
export default class App extends Component {
    render () {
        return (
            <Provider value = { options }>
                <Feed { ...options } />
            </Provider>
        );
    }
}
