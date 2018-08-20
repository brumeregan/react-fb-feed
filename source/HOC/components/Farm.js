import React from 'react';

import { Container, Button, Heading, Message } from '../styled';

import { withState } from './withState';


const Farm = (props) => {

    const applesJSX = Array(props.apples).fill('🍎');

    return (
        <Container>
            <Heading>Farm 🦋</Heading>
            <div>
                <Message>Harvest:</Message>
                <Message>{applesJSX}</Message>
            </div>
            <Button onClick = { props._yieldApples }>Gather harvest! 🍎</Button>
        </Container>
    );
};

export default withState({
    stateName: 'apples',
    stateValue: 1,
    stateUpdaterName: '_yieldApples',
    stateUpdater: (state) => ({
        apples: state.apples+ 1
    })
})(Farm);
