import React, {Component} from 'react';
import { Container, Form, Card, Col, Button } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';

const operationType = ["Demand deposit", "Term deposit", "Credit"];
const currencyType = ["BYN", "USD", "EUR"];
const contractTerm = ["3 months", "6 months", "12 months", "24 months", "36 months"];

const errorStyle = {
    color: 'red',
    fontSize: "14px"
}

export default class AddOperation extends Component {
    constructor(props) {
        super(props);

        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.operationTypeChange = this.operationTypeChange.bind(this);
        this.contractNumberChange = this.contractNumberChange.bind(this);
        this.currencyTypeChange = this.currencyTypeChange.bind(this);
        this.creationDateChange = this.creationDateChange.bind(this);
        this.expireDateChange = this.expireDateChange.bind(this);
        this.contractTermChange = this.contractTermChange.bind(this);
        this.amountChange = this.amountChange.bind(this);
        this.percentChange = this.percentChange.bind(this);
        this.clientIdChange = this.clientIdChange.bind(this);

        this.operationTypeFocus = this.operationTypeFocus.bind(this);
        this.contractNumberFocus = this.contractNumberFocus.bind(this);
        this.currencyTypeFocus = this.currencyTypeFocus.bind(this);
        this.creationDateFocus = this.creationDateFocus.bind(this);
        this.expireDateFocus = this.expireDateFocus.bind(this);
        this.contractTermFocus = this.contractTermFocus.bind(this);
        this.amountFocus = this.amountFocus.bind(this);
        this.percentFocus = this.percentFocus.bind(this);
        this.clientIdFocus = this.clientIdFocus.bind(this);

        this.state = {
            show: false,
            clients: [],

            operationType: "",
            contractNumber: "",
            currencyType: "",
            creationDate: "",
            expireDate: "",
            contractTerm: "",
            amount: "",
            percent: "",
            clientId: "",

            isOperationTypeInvalid: false,
            isContractNumberInvalid: false,
            isCurrencyTypeInvalid: false,
            isCreationDateInvalid: false,
            isExpireDateInvalid: false,
            isContractTermInvalid: false,
            isAmountInvalid: false,
            isPercentInvalid: false,
            isClientIdInvalid: false,

            operationTypeError: "",
            contractNumberError: "",
            currencyTypeError: "",
            creationDateError: "",
            expireDateError: "",
            contractTermError: "",
            amountError: "",
            percentError: "",
            clientIdError: ""
        }

        this.isFormInvalid = false;
    }

    clientIdFocus = () => {
        this.setState({
            isClientIdInvalid: false,
        })
    }

    clientIdChange(event) {
        this.setState({
            clientId: event.target.value
        })
    }

    operationTypeFocus = () => {
        this.setState({
            isOperationTypeInvalid: false
        })
    }

    operationTypeChange(event) {
        this.setState({
            operationType: event.target.value
        })
    }

    contractNumberFocus = () => {
        this.setState({
            isContractNumberInvalid: false
        })
    }

    contractNumberChange(event) {
        this.setState({
            contractNumber: event.target.value
        })
        console.log(this.state.contractNumber);
    }

    currencyTypeFocus = () => {
        this.setState({
            isCurrencyTypeInvalid: false
        })
    }

    currencyTypeChange(event) {
        this.setState({
            currencyType: event.target.value
        })
    }

    creationDateFocus = () => {
        this.setState({
            isCreationDateInvalid: false
        })
    }

    creationDateChange(event) {
        this.setState({
            creationDate: event.target.value
        })
    }

    expireDateFocus = () => {
        this.setState({
            isExpireDateInvalid: false
        })
    }

    expireDateChange(event) {
        this.setState({
            expireDate: event.target.value
        })
    }

    contractTermFocus = () => {
        this.setState({
            isContractTermInvalid: false
        })
    }

    contractTermChange(event) {
        this.setState({
            contractTerm: event.target.value
        })
    }

    amountFocus = () => {
        this.setState({
            isAmountInvalid: false
        })
    }

    amountChange(event) {
        this.setState({
            amount: event.target.value
        })
    }

    percentFocus = () => {
        this.setState({
            isPercentInvalid: false
        })
    }

    percentChange(event) {
        this.setState({
            percent: event.target.value
        })
    }

    validate = () => {
        this.isFormInvalid = false;

        if (this.state.operationType === "") {
            this.setState({
                isOperationTypeInvalid: true,
                operationTypeError: "Operation type is not selected.",
            })
            this.isFormInvalid = true;
        }

        if (!this.state.contractNumber.match(/^[0-9]+$/)) {
            this.setState({
                isContractNumberInvalid: true,
                contractNumberError: "Contract number must consist of digits.",
            })
            this.isFormInvalid = true;
        }
        else if (this.state.contractNumber.length < 5 || this.state.contractNumber.length > 10) {
            this.setState({
                isContractNumberInvalid: true,
                contractNumberError: "Contract number length must be between 5 and 10 characters.",
            })
            this.isFormInvalid = true;
        }

        if (this.state.creationDate === "") {
            this.setState({
                isCreationDateInvalid: true,
                creationDateError: "Creation date is not selected.",
            })
            this.isFormInvalid = true;
        }
        else if (new Date(this.state.creationDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")) < new Date()) {
            this.setState({
                isCreationDateInvalid: true,
                creationDateError: "Creation date must later than today date",
            })
            this.isFormInvalid = true;
        }

        if (this.state.expireDate === "") {
            this.setState({
                isExpireDateInvalid: true,
                expireDateError: "Expire date is not selected.",
            })
            this.isFormInvalid = true;
        }
        else if (new Date(this.state.expireDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") < new Date(this.state.expireDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")))) {
            this.setState({
                isExpireDateInvalid: true,
                expireDateError: "Expire date must be later than creation date.",
            })
            this.isFormInvalid = true;
        }

        if (this.state.contractTerm === "") {
            this.setState({
                isContractTermInvalid: true,
                contractTermError: "Contract term is not selected.",
            })
            this.isFormInvalid = true;
        }

        if (!this.state.amount.match(/^[0-9]+$/)) {
            this.setState({
                isAmountInvalid: true,
                amountError: "Amount must be constist of digits.",
            })
            this.isFormInvalid = true;
        }
        else if (Number.parseInt(this.state.amount) < 1 || Number.parseInt(this.state.amount) > 1000000) {
            this.setState({
                isAmountInvalid: true,
                amountError: "Amount must be between 1 and 1000000.",
            })
            this.isFormInvalid = true;
        }

        if (!this.state.percent.match(/^[0-9]+$/)) {
            this.setState({
                isPercentInvalid: true,
                percentError: "Percent must be consists of digits.",
            })
            this.isFormInvalid = true;
        }
        else if (Number.parseInt(this.state.percent) < 1 || Number.parseInt(this.state.percent) > 100) {
            this.setState({
                isPercentInvalid: true,
                percentError: "Percent must be between 1 and 100.",
            })
            this.isFormInvalid = true;
        }
    }

    onReset = () => {
        this.setState({
            operationType: "",
            contractNumber: "",
            currencyType: "",
            creationDate: "",
            expireDate: "",
            contractTerm: "",
            amount: "",
            percent: "",
            clientId: "",

            isOperationTypeInvalid: false,
            isContractNumberInvalid: false,
            isCurrencyTypeInvalid: false,
            isCreationDateInvalid: false,
            isExpireDateInvalid: false,
            isContractTermInvalid: false,
            isAmountInvalid: false,
            isPercentInvalid: false,
            isClientIdInvalid: false,
        })
    }

    onSubmit = event => {
        event.preventDefault();
        this.addOperation();
    }

    addOperation = () => {
        const operation = {
            operationType: this.state.operationType,
            contractNumber: this.state.contractNumber,
            currencyType: this.state.currencyType,
            creationDate: this.state.creationDate,
            expireDate: this.state.expireDate,
            contractTerm: this.state.contractTerm,
            amount: this.state.amount,
            percent: this.state.percent,
            clientId: this.state.clientId
        }

        axios.post("http://localhost:8080/api/operations/add", operation).then(
            response => {
                this.setState({show :true})
                setTimeout(() => this.setState({show: false}), 3000);
                setTimeout(() => this.customerList(), 3000);
            },
        )
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/client/get").then(
            response => {
                this.setState({
                    clients: response.data
                })
            }
        )
    }



    render() {
        return(
            <div>
                <div style={{"display" : this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Customer saved successfully."}/>
                </div>

                <Container style={{marginBottom: '70px', marginTop: '70px'}}>
                    <Card className="border border-light bg-light text-black">
                        <Form onReset={this.onReset} onSubmit={this.addOperation} noValidate>
                            <Card.Header>Add operation</Card.Header>
                            <Card.Body>
                                <Form.Row>
                                    <Form.Group as={Col} id="clientSelect">
                                        <Form.Label>Client</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="client" 
                                            autoComplete="off"
                                            value={this.state.clientId}
                                            onChange={this.clientIdChange} 
                                            isInvalid={this.state.isClientIdInvalid}
                                            onFocus={this.clientIdFocus}>
                                                <option value="">Select...</option>
                                                {this.state.clients.map((client) => (
                                                    <option value={client.id}>{client.firstname} {client.surname} {client.patronymic}</option>
                                                ))}
                                        </Form.Control>
                                        {this.state.isClientIdInvalid ? <span style={errorStyle}>{this.state.clientIdError}</span> : null}
                                    </Form.Group>
                                    <Form.Group as={Col} id="operationTypeSelect">
                                        <Form.Label>Operation type</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="operationType" 
                                            autoComplete="off"
                                            value={this.state.operationType}
                                            onChange={this.operationTypeChange} 
                                            isInvalid={this.state.isOperationTypeInvalid}
                                            onFocus={this.operationTypeFocus}>
                                                <option value="">Select...</option>
                                                {operationType.map((type, index) => (
                                                    <option value={index}>{type}</option>
                                                ))}
                                        </Form.Control>
                                        {this.state.isOperationTypeInvalid ? <span style={errorStyle}>{this.state.operationTypeError}</span> : null}
                                    </Form.Group>

                                    <Form.Group as={Col} id="contractNumberInput">
                                        <Form.Label>Contract number</Form.Label>
                                        <Form.Control 
                                            name="contractNumber"
                                            type="text" 
                                            autoComplete="off"
                                            value={this.state.contractNumber}
                                            onChange={this.contractNumberChange}
                                            isInvalid={this.state.isContractNumberInvalid}
                                            onFocus={this.contractNumberFocus}
                                            maxLength="100"
                                            placeholder="Enter contract number" />
                                            {this.state.isContractNumberInvalid ? <span style={errorStyle}>{this.state.contractNumberError}</span> : null}
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} id="currencyTypeSelect">
                                        <Form.Label>Currency type</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="currencyType" 
                                            autoComplete="off"
                                            value={this.state.currencyType}
                                            onChange={this.currencyTypeChange} 
                                            isInvalid={this.state.isCurrencyTypeInvalid}
                                            onFocus={this.currencyTypeFocus}>
                                                <option value="">Select...</option>
                                                {currencyType.map((type, index) => (
                                                    <option value={index}>{type}</option>
                                                ))}
                                        </Form.Control>
                                        {this.state.isCurrencyTypeInvalid ? <span style={errorStyle}>{this.state.currencyTypeError}</span> : null}
                                    </Form.Group>

                                    <Form.Group as={Col} id="creationDatePicker">
                                        <Form.Label>Creation date</Form.Label>
                                        <Form.Control
                                            name="creationDate" 
                                            type="date"
                                            autoComplete="off"
                                            value={this.state.creationDate}
                                            onChange={this.creationDateChange} 
                                            isInvalid={this.state.isCreationDateInvalid}
                                            onFocus={this.creationDateFocus}
                                            placeholder="Pick creation date"/>
                                            {this.state.isCreationDateInvalid ? <span style={errorStyle}>{this.state.creationDateError}</span> : null}
                                    </Form.Group>

                                    <Form.Group as={Col} id="expireDatePicker">
                                        <Form.Label>Expire date</Form.Label>
                                        <Form.Control
                                            name="expireDate" 
                                            type="date"
                                            autoComplete="off"
                                            value={this.state.expireDate}
                                            onChange={this.expireDateChange} 
                                            isInvalid={this.state.isExpireDateInvalid}
                                            onFocus={this.expireDateFocus}
                                            placeholder="Pick expire date"/>
                                            {this.state.isExpireDateInvalid ? <span style={errorStyle}>{this.state.expireDateError}</span> : null}
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} id="contractTermSelect">
                                        <Form.Label>Contract term</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="contractTerm" 
                                            autoComplete="off"
                                            value={this.state.contractTerm}
                                            onChange={this.contractTermChange} 
                                            isInvalid={this.state.isContractTermInvalid}
                                            onFocus={this.contractTermFocus}>
                                                <option value="">Select...</option>
                                                {contractTerm.map((type, index) => (
                                                    <option value={index}>{type}</option>
                                                ))}
                                        </Form.Control>
                                        {this.state.isContractTermInvalid ? <span style={errorStyle}>{this.state.contractTermError}</span> : null}
                                    </Form.Group>

                                    <Form.Group as={Col} id="amountInput">
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control 
                                            name="amount"
                                            type="text" 
                                            autoComplete="off"
                                            value={this.state.amount}
                                            onChange={this.amountChange}
                                            isInvalid={this.state.isAmountInvalid}
                                            onFocus={this.amountFocus}
                                            maxLength="100"
                                            placeholder="Enter amount" />
                                            {this.state.isAmountInvalid ? <span style={errorStyle}>{this.state.amountError}</span> : null}
                                    </Form.Group>

                                    <Form.Group as={Col} id="percentInput">
                                        <Form.Label>Percent</Form.Label>
                                        <Form.Control 
                                            name="percent"
                                            type="text" 
                                            autoComplete="off"
                                            value={this.state.percent}
                                            onChange={this.percentChange}
                                            isInvalid={this.state.isPercentInvalid}
                                            onFocus={this.percentFocus}
                                            maxLength="100"
                                            placeholder="Enter percent" />
                                            {this.state.isPercentInvalid ? <span style={errorStyle}>{this.state.percentError}</span> : null}
                                    </Form.Group>
                                </Form.Row>
                            </Card.Body>
                            <Card.Footer>
                                <Button variant="primary" type="submit"><FontAwesomeIcon icon={faSave}/>&nbsp;Save</Button>
                                &nbsp;
                                <Button variant="danger" type="reset"><FontAwesomeIcon icon={faUndo}/>&nbsp;Reset</Button>
                            </Card.Footer>
                        </Form>
                    </Card>
                </Container>
            </div>
        )
    }
}