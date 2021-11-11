import React, {Component} from 'react';

import {Navbar, Nav, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import AccrualService from './services/accrual.service.js';

export default class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.closeDay = this.closeDay.bind(this);
    }
    
    closeDay = () => {
        AccrualService.closeDay().then(
            response => {
                // this.props.history.push("/bankAccounts");
            }
        )
    }

    render() {
        return (
            <Navbar bg="light" variant="light" fixed="top">
                <Link to={""} className="navbar-brand">
                    Customer Service
                </Link>
                <Nav className="mr-auto" style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                    <Link to="/addCustomer" className="nav-link">Add customer</Link>
                    <Link to="/customersList" className="nav-link">Customer List</Link>
                    <Link to="/addOperation" className="nav-link">Add Operation</Link>
                    <Link to="/bankAccounts" className="nav-link">Bank Accounts</Link>
                    <Link to="/operations" className="nav-link">Operations</Link>
                    </div>
                    <div>
                        <Button variant="outline-success" onClick={this.closeDay}>Close day</Button>
                    </div>
                </Nav>
            </Navbar>
        );
    }
}

