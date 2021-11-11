import React, {Component} from 'react';

import {Container, Jumbotron} from 'react-bootstrap';

export default class Welcome extends Component {
    render() {
        return (
            <Container style={{marginTop: '70px'}}>
            <Jumbotron className="App">
                <h1>Welcome to Bank!</h1>
                <p>
                  A bank is a financial institution that accepts deposits from the public and creates a demand deposit while simultaneously making loans. 
                  Lending activities can be performed either directly or indirectly through capital markets.
                </p>
            </Jumbotron>
            </Container>
        );
    }
}