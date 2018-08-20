import React, { Component } from 'react';

import Styles from './styles.m.css';
import cx from 'classnames';
import { withProfile } from 'components/HOC/withProfile';

import { socket } from 'socket/init';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

@withProfile
export default class StatusBar extends Component {
    state = {
        online: false
    }

    componentDidMount () {
        socket.on('connect', () => {
            this.setState({
                online: true
            });
        });

        socket.on('disconnect', () => {
            this.setState({
                online: false
            });
        });
    }

    componentWillUnmount () {
        socket.removeListener('connect');
        socket.removeListener('disconnect');
    }

    _animateSTatusBarEnter = (statusBar) => {
        fromTo(statusBar, 1, { opacity: 0 }, { opacity: 1 });
    }

    render () {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;

        const { online } = this.state;

        const statusStyle = cx(Styles.status, {
            [Styles.online]: online,
            [Styles.offline]: !online
        });

        const statusMessage = online ? 'Online' : 'Offline';

        return (
            <Transition
                in
                appear
                timeout = { 1000 }
                onEnter = { this._animateStatusBarEnter } >
                <section className = { Styles.statusBar } >
                    <div className = { statusStyle } >
                        <div>
                            {statusMessage}
                        </div>
                        <span />
                    </div>
                    <button>
                        <img src = { avatar } alt = { currentUserFirstName } />
                        <span>{ currentUserFirstName }</span>
                        &nbsp;
                        <span>{ currentUserLastName }</span>
                    </button>
                </section>
            </Transition>

        );
    }
}
