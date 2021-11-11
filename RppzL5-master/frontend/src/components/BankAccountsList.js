import React, {Component} from 'react';
import axios from 'axios';
import { Card, Table, Container } from 'react-bootstrap';

const accountType = ["Deposit main", "Deposit percentage", "Credit main", "Credit pay"]


export default class BankAccountsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bankAccounts: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/bankAccounts/get").then(
            response => {
                this.setState({
                    bankAccounts: response.data
                })
            }
        )
    }

    render() {
        return(
            <div>
                <Container style={{marginBottom: "70px", marginTop: "70px", width: "70%"}} fluid>
                    <Card className={"border border-light bg-light text-black"}>
                        <Card.Header>Bank Accounts List</Card.Header>
                        <Card.Body>
                            <Table bordered hover stripped responsive>
                                <thead>
                                    <tr>
                                        <th className="align-middle">Id</th>
                                        <th className="align-middle">Type</th>
                                        <th className="align-middle">Balance</th>
                                        <th className="align-middle">Number</th>
                                        <th className="align-middle">Firstname</th>
                                        <th className="align-middle">Surname</th>
                                        <th className="align-middle">Patronymic</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.bankAccounts.length === 0 ? 
                                        (
                                            <tr align="center">
                                                <td colSpan={7}>No bank accounts available</td>
                                            </tr>
                                        ) 
                                        :
                                        (
                                            this.state.bankAccounts.map((bankAccount) => (
                                                <tr>
                                                    <td>{bankAccount.id}</td>
                                                    <td>{accountType[bankAccount.type]}</td>
                                                    <td>{bankAccount.balance}</td>
                                                    <td>{bankAccount.number}</td>
                                                    <td>{bankAccount.firstname}</td>
                                                    <td>{bankAccount.surname}</td>
                                                    <td>{bankAccount.patronymic}</td>
                                                </tr>
                                                
                                            ))
                                        ) 
                                    }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }
}