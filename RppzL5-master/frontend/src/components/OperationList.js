import React, {Component} from 'react';
import {Container, Card, Table} from 'react-bootstrap';
import axios from 'axios';

const operationType = ["Demand deposit", "Term deposit", "Credit"];
const currencyType = ["BYN", "USD", "EUR"];
const contractTerm = ["3 months", "6 months", "12 months", "24 months", "36 months"];

export default class OperationList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            operations: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/operations/get").then(
            response => {
                this.setState({
                    operations: response.data
                })
            }
        )
    }

    render() {
        return(
            <div>
                <Container style={{marginBottom: "70px", marginTop: "70px", width: "90%"}} fluid>
                    <Card className={"border border-light bg-light text-black"}>
                        <Card.Header>Bank Accounts List</Card.Header>
                        <Card.Body style={{fontSize: "11px"}}>
                            <Table bordered hover stripped responsive>
                                <thead>
                                    <tr>
                                        <th className="align-middle">Id</th>
                                        <th className="align-middle">Type</th>
                                        <th className="align-middle">Creation date</th>
                                        <th className="align-middle">Expire date</th>
                                        <th className="align-middle">Currency Type</th>
                                        <th className="align-middle">Percent</th>
                                        <th className="align-middle">Contract term</th>
                                        <th className="align-middle">Contract number</th>
                                        <th className="align-middle">Amount</th>
                                        <th className="align-middle">Firstname</th>
                                        <th className="align-middle">Surname</th>
                                        <th className="align-middle">Patronymic</th>
                                        <th className="align-middle">Deposit main</th>
                                        <th className="align-middle">Deposit percentage</th>
                                        <th className="align-middle">Credit main</th>
                                        <th className="align-middle">Credit pay</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.operations.length === 0 ? 
                                        (
                                            <tr align="center">
                                                <td colSpan={16}>No operations available</td>
                                            </tr>
                                        ) 
                                        :
                                        (
                                            this.state.operations.map((operation) => (
                                                <tr>
                                                    <td>{operation.id}</td>
                                                    <td>{operationType[operation.operationType]}</td>
                                                    <td>{operation.creationDate}</td>
                                                    <td>{operation.expireDate}</td>
                                                    <td>{currencyType[operation.currencyType]}</td>
                                                    <td>{operation.percent}</td>
                                                    <td>{contractTerm[operation.contractTerm]}</td>
                                                    <td>{operation.contractNumber}</td>
                                                    <td>{operation.amount}</td>
                                                    <td>{operation.firstname}</td>
                                                    <td>{operation.surname}</td>
                                                    <td>{operation.patronymic}</td>
                                                    <td>{operation.depositMainAccountNumber}</td>
                                                    <td>{operation.depositPercentageAccountNumber}</td>
                                                    <td>{operation.creditMainAccountNumber}</td>
                                                    <td>{operation.creditPayAccountNumber}</td>
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