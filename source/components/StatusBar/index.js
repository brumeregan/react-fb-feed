import React, { Component } from "react";

import Styles from "./styles.m.css";
import cx from "classnames";
import { withProfile } from "components/HOC/withProfile";

import { socket } from "socket/init";
import { Transition } from "react-transition-group";
import { fromTo } from "gsap";

import { Link } from "react-router-dom";

@withProfile
export default class StatusBar extends Component {
    state = {
        online: false,
    };

    componentDidMount () {
        socket.on("connect", () => {
            this.setState({
                online: true,
            });
        });

        socket.on("disconnect", () => {
            this.setState({
                online: false,
            });
        });
    }

    componentWillUnmount () {
        socket.removeListener("connect");
        socket.removeListener("disconnect");
    }

    _animateStatusBarEnter = (statusBar) => {
        fromTo(statusBar, 1, { opacity: 0 }, { opacity: 1 });
    };

    render () {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
            _logout,
        } = this.props;
        const { online } = this.state;
        const statusStyle = cx(Styles.status, {
            [Styles.online]:  online,
            [Styles.offline]: !online,
        });

        const statusMessage = online ? "Online" : "Offline";

        return (
            <Transition
                appear
                in
                onEnter = { this._animateStatusBarEnter }
                timeout = { 1000 }>
                <section className = { Styles.statusBar }>
                    <div className = { statusStyle }>
                        <div>{statusMessage}</div>
                        <span />
                    </div>
                    <Link to = '/profile'>
                        <img alt = { currentUserFirstName } src = { avatar } />
                        <span>{currentUserFirstName}</span>
                        &nbsp;
                        <span>{currentUserLastName}</span>
                    </Link>

                    <Link to = '/feed'>Feed</Link>
                    <button onClick = { _logout }>Logout</button>
                </section>
            </Transition>
        );
    }
}
