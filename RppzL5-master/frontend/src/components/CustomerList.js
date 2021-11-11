import React, {Component} from 'react';
import axios from 'axios';

import {ButtonGroup, Card, Table, Button, Container} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';
import {Link} from 'react-router-dom';

export default class CustomerList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customers : [],

            citizenshipList : [],
            cityOfActualResidenceList : [],
            disabilityList : [],
            marialStatusList : [],

            isDeletedSuccessfully: false
        }

    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/client/get")
            .then(response => response.data)
            .then((data) => (this.setState({customers: data})))

        axios.get("http://localhost:8080/api/citizenship/get")
            .then(response => response.data)
            .then((data) => (this.setState( {citizenshipList: data} ))) 

        axios.get("http://localhost:8080/api/disability/get")
            .then(response => response.data)
            .then((data) => (this.setState( {disabilityList: data} )))

        axios.get("http://localhost:8080/api/marialStatus/get")
            .then(response => response.data)
            .then((data) => (this.setState( {marialStatusList: data} )))

        axios.get("http://localhost:8080/api/cityOfActualResidence/get")
            .then(response => response.data)
            .then((data) =>(this.setState( {cityOfActualResidenceList: data} )))
    };

    deleteCustomer = (customerId) => {
        axios.delete("http://localhost:8080/api/client/delete/" + customerId)
        .then(response => {
            if (response.data != null) {
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}), 3000);
                this.setState({
                    customers: this.state.customers.filter(customer => customer.id !== customerId)
                })
            } 
            else {
                this.setState({"show":false});
            }
        })
    };

    render() {
        return (
            <div>
                <div style={{"display" : this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Customer deleted successfully."}/>
                </div>

                <Container style={{marginBottom: "70px", marginTop: "70px"}} fluid>
                <Card className={"border border-light bg-light text-black"}>
                    <Card.Header><FontAwesomeIcon icon={faList}/> Customer List</Card.Header>
                    <Card.Body style={{fontSize: "11px"}}>
                        <Table bordered hover stripped="true" responsive>
                            <thead>
                                <tr>
                                    <th className="align-middle">Surname</th>
                                    <th className="align-middle">Firstname</th>
                                    <th className="align-middle">Patronymic</th>
                                    <th className="align-middle">Date Of Birth</th>
                                    <th className="align-middle">Passport Series</th>
                                    <th className="align-middle">Passport Number</th>
                                    <th className="align-middle">Issued By</th>
                                    <th className="align-middle">Date Of Issue</th>
                                    <th className="align-middle">Id Number</th>
                                    <th className="align-middle">Place Of Birth</th>
                                    <th className="align-middle">Address Of The Actual Residence</th>
                                    <th className="align-middle">Home Phone</th>
                                    <th className="align-middle">Mobile Phone</th>
                                    <th className="align-middle">Email</th>
                                    <th className="align-middle">Place Of Work</th>
                                    <th className="align-middle">Position</th>
                                    <th className="align-middle">Place Of Residence</th>
                                    <th className="align-middle">Retiree</th>
                                    <th className="align-middle">Monthly Income</th>
                                    <th className="align-middle">City Of Actual Residence</th>
                                    <th className="align-middle">Marial Status</th>
                                    <th className="align-middle">Citizenship</th>
                                    <th className="align-middle">Disability</th>
                                    <th className="align-middle">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.customers.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="23">No Customers Available</td>
                                    </tr> 
                                    :
                                this.state.customers.map((customer) => (
                                    <tr key={customer.idNumber}>
                                        <td>{customer.surname}</td>
                                        <td>{customer.firstname}</td>
                                        <td>{customer.patronymic}</td>
                                        <td>{customer.dateOfBirth}</td>
                                        <td>{customer.passportSeries}</td>
                                        <td>{customer.passportNumber}</td>
                                        <td>{customer.passportIssuedBy}</td>
                                        <td>{customer.passportDateOfIssue}</td>
                                        <td>{customer.idNumber}</td>
                                        <td>{customer.placeOfBirth}</td>
                                        <td>{customer.addressOfTheActualResidence}</td>
                                        <td>{customer.homePhone}</td>
                                        <td>{customer.mobilePhone}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.placeOfWork}</td>
                                        <td>{customer.position}</td>
                                        <td>{customer.placeOfResidence}</td>
                                        <td>{customer.retiree === "1" ? "Yes" : "No"}</td>
                                        <td>{customer.monthlyIncome}</td>
                                        <td>{this.state.cityOfActualResidenceList.filter((c) => (c.cityId === customer.cityOfActualResidenceId)).map(c => c.cityName)}</td>
                                        <td>{this.state.marialStatusList.filter((m) => (m.statusId === customer.marialStatusId)).map(m => m.statusName)}</td>
                                        <td>{this.state.citizenshipList.filter((c) => (c.citizenshipId === customer.citizenshipId)).map(c => c.citizenshipName)}</td>
                                        <td>{this.state.disabilityList.filter((d) => (d.disabilityId === customer.disabilityId)).map(d => d.disabilityName)}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"edit/" + customer.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit}/></Link>
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteCustomer.bind(this, customer.id)}><FontAwesomeIcon icon={faTrash}/></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                )) }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>    
                </Container>  
            </div>     
        );
    }
}