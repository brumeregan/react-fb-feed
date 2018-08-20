import React, { Component } from 'react';

// import { Container, Button, Heading, Message } from '../styled';
import { getDisplayName } from "../helpers";

export const withState = ({
          stateName,
          stateValue,
          stateUpdaterName,
          stateUpdater
}) => (WrappedComponent) => {
    class WithState extends Component {
        state = {
            [stateName]: stateValue // computed property
        };

        [stateUpdaterName] = () => {
            this.setState(stateUpdater);
        };

        render () {

            const updatersToForward = {
                [stateUpdaterName]: this[stateUpdaterName]
            }

            return (
                <WrappedComponent
                    { ...this.props }
                    { ...this.state }
                    { ...updatersToForward }
                />
            );
        }
    }

    WithState.displayName = `WithState(${getDisplayName(WrappedComponent)})`;

    return WithState;
};
