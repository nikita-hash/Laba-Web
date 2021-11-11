import React, {Component} from 'react';

import {Card, Form, Button, Col, Container, InputGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';
import MaskedFormControl from 'react-bootstrap-maskedinput';

const errorStyle = {
    color: 'red',
    fontSize: "14px"
}

export default class Customer extends Component {
    constructor(props) {
        super(props);

        this.state = this.initialState
        this.state.show = false;

        this.state.isValid = true;

        this.state.isSurnameValid = true;
        this.state.isFirstnameValid = true;
        this.state.isPatronymicValid = true;
        this.state.isDateOfBirthValid = true;
        this.state.isPassportSeriesValid = true;
        this.state.isPassportNumberValid = true;
        this.state.isPassportIssuedByValid = true;
        this.state.isPassportDateOfIssueValid = true;
        this.state.isIdNumberValid = true;
        this.state.isPlaceOfBirthValid = true;
        this.state.isAddressOfTheActualResidenceValid = true;
        this.state.isHomePhoneValid = true;
        this.state.isMobilePhoneValid = true;
        this.state.isEmailValid = true;
        this.state.isPlaceOfWorkValid = true;
        this.state.isPositionValid = true;
        this.state.isPlaceOfResidenceValid = true;
        this.state.isMonthlyIncomeValid = true;
        this.state.isCityOfActualResidenceSelected = true;
        this.state.isMarialStatusSelected = true;
        this.state.isDisabilitySelected = true;
        this.state.isCitizenshipSelected = true;


        this.customerChange = this.customerChange.bind(this);
        this.submitCustomer = this.submitCustomer.bind(this);
    }

    initialState = {
        id: '',
        surname: '', 
        firstname: '', 
        patronymic: '',
        dateOfBirth: '', 
        passportSeries: '', 
        passportNumber: '',
        passportIssuedBy: '',
        passportDateOfIssue: '',
        idNumber: '',
        placeOfBirth: '',
        addressOfTheActualResidence: '',
        homePhone: '',
        mobilePhone: '',
        email: '',
        placeOfWork: '',
        position: '',
        placeOfResidence: '',
        retiree: '',
        monthlyIncome: '',
        cityOfActualResidence: '',
        marialStatus: '',
        citizenship: '',
        disability: '',

        citizenshipList: [],
        disabilityList: [],
        marialStatusList: [],
        cityOfActualResidenceList: []
    }

    submitCustomer = event => {
        event.preventDefault();

        this.validate();

        const customer = {
            surname: this.state.surname,
            firstname: this.state.firstname,
            patronymic: this.state.patronymic,
            dateOfBirth: this.state.dateOfBirth,
            passportSeries: this.state.passportSeries,
            passportNumber: this.state.passportNumber,
            passportIssuedBy: this.state.passportIssuedBy,
            passportDateOfIssue: this.state.passportDateOfIssue,
            idNumber: this.state.idNumber,
            placeOfBirth: this.state.placeOfBirth,
            addressOfTheActualResidence: this.state.addressOfTheActualResidence,
            homePhone: this.state.homePhone.length !== 0 ? "+375" + this.state.homePhone : this.state.homePhone,
            mobilePhone: this.state.mobilePhone.length !== 0 ? "+375" + this.state.mobilePhone : this.state.mobilePhone,
            email: this.state.email,
            placeOfWork: this.state.placeOfWork,
            position: this.state.position,
            placeOfResidence: this.state.placeOfResidence,
            retiree: this.state.retiree ? "1" : "0",
            monthlyIncome: this.state.monthlyIncome,
            cityOfActualResidenceId: this.state.cityOfActualResidence,
            marialStatusId: this.state.marialStatus,
            citizenshipId: this.state.citizenship,
            disabilityId: this.state.disability
        }

        if (this.isValid) {
            axios.post("http://localhost:8080/api/client/add", customer)
                .then(response => {
                    if(response.data != null) {
                        this.setState({"show":true})
                        setTimeout(() => this.setState({"show":false}), 3000);
                    } 
                    else {
                        this.setState({"show":false});
                    }
                })
                this.resetCustomer();
        }
    };

    updateCustomer = event => {
        event.preventDefault();

        this.validate();

        const customer = {
            id: this.state.id,
            surname: this.state.surname,
            firstname: this.state.firstname,
            patronymic: this.state.patronymic,
            dateOfBirth: this.state.dateOfBirth,
            passportSeries: this.state.passportSeries,
            passportNumber: this.state.passportNumber,
            passportIssuedBy: this.state.passportIssuedBy,
            passportDateOfIssue: this.state.passportDateOfIssue,
            idNumber: this.state.idNumber,
            placeOfBirth: this.state.placeOfBirth,
            addressOfTheActualResidence: this.state.addressOfTheActualResidence,
            homePhone: this.state.homePhone.length !== 0 ? "+375" + this.state.homePhone : this.state.homePhone,
            mobilePhone: this.state.mobilePhone.length !== 0 ? "+375" + this.state.mobilePhone : this.state.mobilePhone,
            email: this.state.email,
            placeOfWork: this.state.placeOfWork,
            position: this.state.position,
            placeOfResidence: this.state.placeOfResidence,
            retiree: this.state.retiree ? "1" : "0",
            monthlyIncome: this.state.monthlyIncome,
            cityOfActualResidenceId: this.state.cityOfActualResidence,
            marialStatusId: this.state.marialStatus,
            citizenshipId: this.state.citizenship,
            disabilityId: this.state.disability
        }

        if (this.isValid) {
            axios.put("http://localhost:8080/api/client/edit/" + customer.id, customer)
                .then(response => {
                    if(response.data != null) {
                        this.setState({"show":true})
                        setTimeout(() => this.setState({"show":false}), 3000);
                        setTimeout(() => this.customerList(), 3000);
                    } 
                    else {
                        this.setState({"show":false});
                    }
                })
                this.resetCustomer();
        }
    }



    citizenshipSelectClick = () => {
        this.setState({isCitizenshipSelected: true});
    };

    disabilitySelectClick = () => {
        this.setState({isDisabilitySelected: true});
    };

    marialStatusSelectClick = () => {
        this.setState({isMarialStatusSelected: true});
    };

    cityOfActualResidenceSelectClick = () => {
        this.setState({isCityOfActualResidenceSelected: true});
    };

    surnameClick = () => {
        this.setState({isSurnameValid: true});
    };

    firstnameClick = () => {
        this.setState({isFirstnameValid: true});
    };

    patronymicClick = () => {
        this.setState({isPatronymicValid: true});
    };

    dateOfBirthClick = () => {
        this.setState({isDateOfBirthValid: true});
    };

    passportSeriesClick = () => {
        this.setState({isPassportSeriesValid: true});
    };

    passportNumberClick = () => {
        this.setState({isPassportNumberValid: true});
    };

    passportIssuedByClick = () => {
        this.setState({isPassportIssuedByValid: true});
    };

    passportDateOfIssueClick = () => {
        this.setState({isPassportDateOfIssueValid: true});
    };

    idNumberClick = () => {
        this.setState({isIdNumberValid: true});
    };

    placeOfBirthClick = () => {
        this.setState({isPlaceOfBirthValid: true});
    };

    addressOfTheActualResidenceClick = () => {
        this.setState({isAddressOfTheActualResidenceValid: true});
    };

    homePhoneClick = () => {
        this.setState({isHomePhoneValid: true});
    };

    mobilePhoneClick = () => {
        this.setState({isMobilePhoneValid: true});
    };

    emailClick = () => {
        this.setState({isEmailValid: true});
    };

    placeOfWorkClick = () => {
        this.setState({isPlaceOfBirthValid: true});
    };

    positionClick = () => {
        this.setState({isPositionValid: true});
    };

    placeOfResidenceClick = () => {
        this.setState({isPlaceOfResidenceValid: true});
    };

    monthlyIncomeClick = () => {
        this.setState({isMonthlyIncomeValid: true});
    };

    resetCustomer = () => {
        this.setState(() => this.initialState);
        this.getChooseList();
    };



    validate = () => {
        this.setState({isValid: true});

        if (!this.state.surname.match(/^[A-Za-zА-Яа-я]+$/)) {
            this.setState({isSurnameValid: false})
            this.setState({isValid: false});
        }

        if (!this.state.firstname.match(/^[A-Za-zА-Яа-я]+$/)) {
            this.setState({isFirstnameValid: false})
            this.setState({isValid: false});
        }

        if (!this.state.patronymic.match(/^[A-Za-zА-Яа-я]+$/)) {
            this.setState({isPatronymicValid: false})
            this.setState({isValid: false});
        }

        if (this.state.dateOfBirth === '' || new Date(this.state.dateOfBirth.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")) < new Date("01/01/1900") ||
            new Date(this.state.dateOfBirth.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")) > new Date("01/01/2016")){
            
            this.setState({isDateOfBirthValid: false});
            this.setState({isValid: false});
        }

        if (!this.state.passportSeries.match(/^[A-Z]+$/)) {
            this.setState({isPassportSeriesValid: false});
            this.setState({isValid: false});
        }

        if (!this.state.passportNumber.match(/^[0-9]+$/)) {
            this.setState({isPassportNumberValid: false})
            this.setState({isValid: false});
        }

        if (!this.state.passportIssuedBy.match(/^[A-Za-zА-Яа-я. ]+$/)){
            this.setState({isPassportIssuedByValid: false});
            this.setState({isValid: false});
        }

        if (this.state.passportDateOfIssue === '' || new Date(this.state.passportDateOfIssue.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")) < new Date("01/01/1900") ||
            new Date(this.state.passportDateOfIssue.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")) > new Date("01/01/2016")){
            
            this.setState({isPassportDateOfIssueValid: false});
            this.setState({isValid: false});
        }

        if (!this.state.idNumber.match(/^[A-Za-z0-9]+$/)) {
            this.setState({isIdNumberValid: false});
            this.setState({isValid: false});
        }

        if (!this.state.placeOfBirth.match(/^[A-Za-zА-Яа-я.]+$/)) {
            this.setState({isPlaceOfBirthValid: false});
            this.setState({isValid: false});
        }

        if (!this.state.addressOfTheActualResidence.match(/^[A-Za-zА-Яа-я0-9.]+$/)) {
            this.setState({isAddressOfTheActualResidenceValid: false});
            this.setState({isValid: false});
        }

        if (this.state.homePhone.length !== 0) {
            if (!this.state.homePhone.match(/^[(]{1}[0-9]{2}[)]{1}[ ][-\s/0-9]{9}$/)) {
                this.setState({isHomePhoneValid: false});
                this.setState({isValid: false});
            }
        }

        if (this.state.mobilePhone.length !== 0) {
            if (!this.state.mobilePhone.match(/^[(]{1}[0-9]{2}[)]{1}[ ][-\s/0-9]{9}$/)) {
                this.setState({isMobilePhoneValid: false});
                this.setState({isValid: false});
            }
        }

        if (this.state.email.length !== 0){
            if (!this.state.email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
                this.setState({isEmailValid: false});
                this.setState({isValid: false});
            }
        }

        if (this.state.placeOfWork.length !== 0) {
            if (!this.state.placeOfWork.match(/^[A-Za-zА-Яа-я0-9.]+$/)) {
                this.setState({isPlaceOfWorkValid: false})
                this.setState({isValid: false});
            }
        }

        if (this.state.position.length !== 0) {
            if (!this.state.position.match(/^[A-Za-zА-Яа-я0-9]+$/)) {
                this.setState({isPositionValid: false});
                this.setState({isValid: false});
            }
        }

        if (!this.state.placeOfResidence.match(/^[A-Za-zА-Яа-я]+$/)) {
            this.setState({isPlaceOfResidenceValid: false});
            this.setState({isValid: false});
        }

        if (this.state.monthlyIncome) {
            if (!this.state.monthlyIncome.match(/^[0-9]+$/)) {
                this.setState({isMonthlyIncomeValid: false});
                this.setState({isValid: false});
            }
        }

        if (this.state.citizenship === '0' || this.state.citizenship === '') {
            this.setState({isCitizenshipSelected: false});
            this.setState({isValid: false});
        }

        if (this.state.marialStatus === '0' || this.state.marialStatus === '') {
            this.setState({isMarialStatusSelected: false});
            this.setState({isValid: false});
        }

        if (this.state.cityOfActualResidence === '0' || this.state.cityOfActualResidence === '') {
            this.setState({isCityOfActualResidenceSelected: false});
            this.setState({isValid: false});
        }

        if (this.state.disability === '0' || this.state.disability === '') {
            this.setState({isDisabilitySelected: false});
            this.setState({isValid: false});
        }
    };

    customerChange = event => {
        this.setState({
            [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
        });

        console.log(this.state.homePhone);
    };

    customerList = () => {
        return this.props.history.push("/customersList")
    };

    getChooseList() {
        axios.get("http://localhost:8080/api/citizenship/get")
            .then(response => response.data)
            .then((data) => (this.setState({citizenshipList: data}))) 

        axios.get("http://localhost:8080/api/disability/get")
            .then(response => response.data)
            .then((data) => (this.setState( {disabilityList: data} )))

        axios.get("http://localhost:8080/api/marialStatus/get")
            .then(response => response.data)
            .then((data) => (this.setState( {marialStatusList: data} )))

        axios.get("http://localhost:8080/api/cityOfActualResidence/get")
            .then(response => response.data)
            .then((data) =>(this.setState( {cityOfActualResidenceList: data} )))
    }

    findCustomerById = (customerId) => {
        axios.get("http://localhost:8080/api/client/get/" + customerId)
        .then(response => {
            if (response.data != null ) {
                this.setState({
                    id: response.data.id,
                    surname: response.data.surname, 
                    firstname: response.data.firstname, 
                    patronymic: response.data.patronymic,
                    dateOfBirth: response.data.dateOfBirth, 
                    passportSeries: response.data.passportSeries, 
                    passportNumber: response.data.passportNumber,
                    passportIssuedBy: response.data.passportIssuedBy,
                    passportDateOfIssue: response.data.passportDateOfIssue,
                    idNumber: response.data.idNumber,
                    placeOfBirth: response.data.placeOfBirth,
                    addressOfTheActualResidence: response.data.addressOfTheActualResidence,
                    homePhone: response.data.homePhone,
                    mobilePhone: response.data.mobilePhone,
                    email: response.data.email,
                    placeOfWork: response.data.placeOfWork,
                    position: response.data.position,
                    placeOfResidence: response.data.placeOfResidence,
                    retiree: response.data.retiree,
                    monthlyIncome: response.data.monthlyIncome,
                    cityOfActualResidence: response.data.cityOfActualResidenceId,
                    marialStatus: response.data.marialStatusId,
                    citizenship: response.data.citizenshipId,
                    disability: response.data.disabilityId
                });
            }
        }).catch((error) => {
            console.error("Error - " + error);
        });
    }

    componentDidMount() {
        this.getChooseList();

        const customerId = +this.props.match.params.id;

        if (customerId) {
            this.findCustomerById(customerId);
        }
    }

    render() {

        const {surname, firstname, patronymic, dateOfBirth, passportSeries, passportNumber, passportIssuedBy, 
               passportDateOfIssue, idNumber, placeOfBirth, addressOfTheActualResidence, homePhone, mobilePhone,
               email, placeOfWork, position, placeOfResidence, retiree, monthlyIncome, cityOfActualResidence, 
               marialStatus, citizenship, disability} = this.state;


        return (
            <div>
                <div style={{"display" : this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Customer saved successfully."}/>
                </div>

                <Container style={{marginBottom: '70px', marginTop: '70px'}}>
                <Card className="border border-light bg-light text-black">
                    <Form onReset={this.resetCustomer} onSubmit={this.state.id ? this.updateCustomer : this.submitCustomer} id="addCustomerForm">
                        <Card.Header><FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare}/> {this.state.id ? "Add Customer" : "Update Customer"}</Card.Header>
                        <Card.Body>
                                <Form.Row>
                                    <Form.Group as={Col} id="formGroupSurname">
                                        <Form.Label>Surname</Form.Label>
                                        <Form.Control 
                                            name="surname"
                                            type="text" 
                                            autoComplete="off"
                                            value={surname}
                                            onChange={this.customerChange}
                                            isInvalid={!this.state.isSurnameValid}
                                            onClick={this.surnameClick.bind(this)}
                                            maxLength="50"
                                            placeholder="Enter Surname" />
                                            {!this.state.isSurnameValid ? <span style={errorStyle}>Surname should only consist of letters!</span> : null}
                                    </Form.Group>

                                    <Form.Group as={Col} id="formGroupFirstname">
                                        <Form.Label>Firstname</Form.Label>
                                        <Form.Control 
                                            name="firstname"
                                            type="text" 
                                            autoComplete="off"
                                            value={firstname}
                                            onChange={this.customerChange}
                                            isInvalid={!this.state.isFirstnameValid}
                                            onClick={this.firstnameClick.bind(this)}
                                            maxLength="50"
                                            placeholder="Enter Firstname" />
                                            {!this.state.isFirstnameValid ? <span style={errorStyle}>Firstname should only consists of letters!</span> : null}
                                    </Form.Group>

                                    <Form.Group as={Col} id="formGroupPatronymic">
                                        <Form.Label>Patronymic</Form.Label>
                                        <Form.Control 
                                            name="patronymic"
                                            type="text" 
                                            autoComplete="off"
                                            value={patronymic}
                                            onChange={this.customerChange}
                                            isInvalid={!this.state.isPatronymicValid}
                                            onClick={this.patronymicClick.bind(this)}
                                            maxLength="50"
                                            placeholder="Enter Patronymic" />
                                            {!this.state.isPatronymicValid ? <span style={errorStyle}>Patronymic should only consists of letters!</span> : null}
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} id="formGroupDateOfBirth">
                                        <Form.Label>Date Of Birth</Form.Label>
                                        <Form.Control
                                            name="dateOfBirth" 
                                            type="date"
                                            autoComplete="off"
                                            value={dateOfBirth}
                                            onChange={this.customerChange} 
                                            isInvalid={!this.state.isDateOfBirthValid}
                                            onClick={this.dateOfBirthClick.bind(this)}
                                            placeholder="Pick Date"/>
                                            {!this.state.isDateOfBirthValid ? <span style={errorStyle}>Date should be more than 01/01/1900 and less then 01/01/2016!</span> : null}
                                    </Form.Group>

                                    <Form.Group as={Col} id="formGroupPassportSeries">
                                        <Form.Label>Passport Series</Form.Label>
                                        <Form.Control 
                                            name="passportSeries"
                                            type="text" 
                                            autoComplete="off"
                                            value={passportSeries}
                                            onChange={this.customerChange}
                                            isInvalid={!this.state.isPassportSeriesValid}
                                            onClick={this.passportSeriesClick.bind(this)}
                                            maxLength="2"
                                            placeholder="Enter Passport Series" />
                                            {!this.state.isPassportSeriesValid ? <span style={errorStyle}>Passport series should only consists of uppercase letters!</span> : null}
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} id="formGroupPassportNumber">
                                        <Form.Label>Passport Number</Form.Label>
                                        <Form.Control 
                                            name="passportNumber"
                                            type="text" 
                                            autoComplete="off"
                                            value={passportNumber}
                                            onChange={this.customerChange}
                                            isInvalid={!this.state.isPassportNumberValid}
                                            onClick={this.passportNumberClick.bind(this)}
                                            maxLength="8"
                                            placeholder="Enter Passport Number" />
                                            {!this.state.isPassportNumberValid ? <span style={errorStyle}>Passport number should only consists of digits!</span> : null}
                                    </Form.Group>

                                    <Form.Group as={Col} id="formGroupPassportIssuedBy">
                                        <Form.Label>Passport Issued By</Form.Label>
                                        <Form.Control 
                                            name="passportIssuedBy"
                                            type="text" 
                                            autoComplete="off"
                                            value={passportIssuedBy}
                                            onChange={this.customerChange}
                                            isInvalid={!this.state.isPassportIssuedByValid}
                                            onClick={this.passportIssuedByClick.bind(this)}
                                            maxLength="50"
                                            placeholder="Enter Passport Issued By"/>
                                            {!this.state.isPassportIssuedByValid ? <span style={errorStyle}>Passport issue by should only consist of letters and . symbol!</span> : null}
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} id="formGroupPassportDateOfIssue">
                                        <Form.Label>Passport Date Of Issue</Form.Label>
                                        <Form.Control
                                            name="passportDateOfIssue" 
                                            type="date" 
                                            autoComplete="off"
                                            value={passportDateOfIssue}
                                            onChange={this.customerChange}
                                            isInvalid={!this.state.isPassportDateOfIssueValid}
                                            onClick={this.passportDateOfIssueClick.bind(this)}
                                            placeholder="Pick Passport Date Of Issue" />
                                            {!this.state.isPassportDateOfIssueValid ? <span style={errorStyle}>Passport date of issue should be more than 01/01/1900 and less than 01/01/2016!</span> : null}
                                    </Form.Group>

                                    <Form.Group as={Col} id="formGroupIdNumber">
                                        <Form.Label>Id Number</Form.Label>
                                        <Form.Control 
                                            name="idNumber"
                                            type="text" 
                                            autoComplete="off"
                                            value={idNumber}
                                            onChange={this.customerChange}
                                            isInvalid={!this.state.isIdNumberValid}
                                            onClick={this.idNumberClick.bind(this)}
                                            maxLength="18"
                                            placeholder="Enter Id Number" />
                                            {!this.state.isIdNumberValid ? <span style={errorStyle}>Id number should constist of letters and digits!</span> : null}
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} id="formGroupPlaceOfBirth">
                                        <Form.Label>Place Of Birth</Form.Label>
                                        <Form.Control 
                                            name="placeOfBirth"
                                            type="text" 
                                            autoComplete="off"
                                            value={placeOfBirth}
                                            onChange={this.customerChange}
                                            isInvalid={!this.state.isPlaceOfBirthValid}
                                            onClick={this.placeOfBirthClick.bind(this)}
                                            maxLength="50"
                                            placeholder="Enter Place Of Birth" />
                                            {!this.state.isPlaceOfBirthValid ? <span style={errorStyle}>Place of birth should consist of letters and . symbol!</span> : null}
                                    </Form.Group>

                                    <Form.Group as={Col} id="formGroupAddressOfTheActualResidence">
                                        <Form.Label>Address Of The Actual Residence</Form.Label>
                                        <Form.Control 
                                            name="addressOfTheActualResidence"
                                            type="text" 
                                            autoComplete="off"
                                            value={addressOfTheActualResidence}
                                            onChange={this.customerChange}
                                            isInvalid={!this.state.isAddressOfTheActualResidenceValid}
                                            onClick={this.addressOfTheActualResidenceClick.bind(this)}
                                            maxLength="50"
                                            placeholder="Enter Address Of The Actual Residence" />
                                            {!this.state.isAddressOfTheActualResidenceValid ? <span style={errorStyle}>Address of the actual residence should consist of: letters, digits and .sybmol!</span> : null}
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} id="formGroupHomePhone">
                                        <Form.Label>Home Phone</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="basic-addon1">+375</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <MaskedFormControl 
                                                name="homePhone"
                                                type="tel" 
                                                autoComplete="off"
                                                value={homePhone}
                                                onChange={this.customerChange}
                                                maxLength="9"
                                                mask="(11) 111-11-11"
                                                onClick={this.homePhoneClick.bind(this)}
                                                isInvalid={!this.state.isHomePhoneValid}
                                                placeholder="(__) ___-__-__" />
                                            </InputGroup>
                                            {!this.state.isHomePhoneValid ? <span style={errorStyle}>Home phone should be +375(__)___-__-__!</span> : null}
                                    </Form.Group>

                                    <Form.Group as={Col} id="formGroupMobilePhone">
                                        <Form.Label>Mobile Phone</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="basic-addon1">+375</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <MaskedFormControl
                                                name="mobilePhone"
                                                type="tel" 
                                                autoComplete="off"
                                                value={mobilePhone}
                                                onChange={this.customerChange}
                                                maxLength="13"
                                                mask="(11) 111-11-11"
                                                onClick={this.mobilePhoneClick.bind(this)}
                                                isInvalid={!this.state.isMobilePhoneValid}
                                                placeholder="(__) ___-__-__" />
                                        </InputGroup>
                                        {!this.state.isMobilePhoneValid ? <span style={errorStyle}>Mobile phone should be +375(__)___-__-__!</span> : null}
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} id="formGroupEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control 
                                            name="email"
                                            type="email"
                                            autoComplete="off" 
                                            value={email}
                                            onChange={this.customerChange}
                                            onClick={this.emailClick.bind(this)}
                                            isInvalid={!this.state.isEmailValid}
                                            maxLength="25"
                                            placeholder="Enter Email" />
                                            {!this.state.isEmailValid ? <span style={errorStyle}>Email should be like example@example.com</span> : null}
                                    </Form.Group>

                                    <Form.Group as={Col} id="formGroupPlaceOfWork">
                                        <Form.Label>Place Of Work</Form.Label>
                                        <Form.Control 
                                            name="placeOfWork"
                                            type="text" 
                                            autoComplete="off"
                                            value={placeOfWork}
                                            onChange={this.customerChange}
                                            onClick={this.placeOfWorkClick.bind(this)}
                                            isInvalid={!this.state.isPlaceOfWorkValid}
                                            maxLength="50"
                                            placeholder="Enter Place Of Work" />
                                            {!this.state.isPlaceOfWorkValid ? <span style={errorStyle}>Place of work should consist of letters, digits and . symbol!</span> : null}
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} id="formGroupPosition">
                                        <Form.Label>Position</Form.Label>
                                        <Form.Control 
                                            name="position"
                                            type="text" 
                                            autoComplete="off"
                                            value={position}
                                            onChange={this.customerChange}
                                            onClick={this.positionClick.bind(this)}
                                            isInvalid={!this.state.isPositionValid}
                                            placeholder="Enter Position" />
                                            {!this.state.isPositionValid ? <span style={errorStyle}>Position should consist of letters and digits!</span> : null}
                                    </Form.Group>

                                    <Form.Group as={Col} id="formGroupPlaceOfResidence">
                                        <Form.Label>Place Of Residence</Form.Label>
                                        <Form.Control 
                                            name="placeOfResidence"
                                            type="text" 
                                            autoComplete="off"
                                            value={placeOfResidence}
                                            onChange={this.customerChange}
                                            onClick={this.placeOfResidenceClick.bind(this)}
                                            isInvalid={!this.state.isPlaceOfResidenceValid}
                                            placeholder="Enter Place Of Residence" />
                                            {!this.state.isPlaceOfResidenceValid ? <span style={errorStyle}>Place of residence should consist of letters!</span> : null}
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} id="formGroupMonthlyIncome">
                                        <Form.Label>Monthly Income</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>$</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control 
                                                name="monthlyIncome"
                                                type="number" 
                                                step="100"
                                                autoComplete="off"
                                                maxLength="13"
                                                value={monthlyIncome}
                                                onChange={this.customerChange}
                                                onClick={this.monthlyIncomeClick.bind(this)}
                                                isInvalid={!this.state.isMonthlyIncomeValid}
                                                placeholder="Enter Monthly Income" />
                                        </InputGroup>
                                        {!this.state.isMobilePhoneValid ? <span style={errorStyle}>Monthly income should consist only of digits!</span> : null}
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} id="formGroupCityOfActualResidence">
                                        <Form.Label>City Of Actual Residence</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            className="mr-sm-2" custom 
                                            name="cityOfActualResidence"
                                            autoComplete="off"
                                            value={cityOfActualResidence}
                                            onChange={this.customerChange}
                                            onClick={this.cityOfActualResidenceSelectClick.bind(this)}
                                            isInvalid={!this.state.isCityOfActualResidenceSelected}>
                                                <option value="0">Choose...</option>
                                                {this.state.cityOfActualResidenceList.map((cityOfActualResidence) => (
                                                    <option value={cityOfActualResidence.cityId} key={cityOfActualResidence.cityId}>{cityOfActualResidence.cityName}</option>
                                                ))}
                                        </Form.Control>
                                        {!this.state.isCityOfActualResidenceSelected ? <span style={errorStyle}>City of actual residence not selected!</span> : null}
                                    </Form.Group>

                                    <Form.Group as={Col} id="formGroupMarialStatus">
                                        <Form.Label>Marial Status</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            className="mr-sm-2" custom 
                                            name="marialStatus"
                                            autoComplete="off"
                                            value={marialStatus}
                                            onChange={this.customerChange}
                                            onClick={this.marialStatusSelectClick.bind(this)}
                                            isInvalid={!this.state.isMarialStatusSelected}>
                                                <option value="0">Choose...</option>
                                                {this.state.marialStatusList.map((marialStatus) => (
                                                    <option value={marialStatus.statusId} key={marialStatus.statusId}>{marialStatus.statusName}</option>
                                                ))}
                                        </Form.Control>
                                        {!this.state.isMarialStatusSelected ? <span style={errorStyle}>Marial status not selected!</span> : null}
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} id="formGroupCitizenship">
                                        <Form.Label>Citizenship</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            className="mr-sm-2" custom 
                                            name="citizenship"
                                            autoComplete="off"
                                            value={citizenship}
                                            onChange={this.customerChange}
                                            onClick={this.citizenshipSelectClick.bind(this)}
                                            isInvalid={!this.state.isCitizenshipSelected}>
                                                <option value="0">Choose...</option>
                                                {this.state.citizenshipList.map((citizenship) => (
                                                    <option value={citizenship.citizenshipId} key={citizenship.citizenshipId}>{citizenship.citizenshipName}</option>
                                                ))}
                                        </Form.Control>
                                        {!this.state.isCitizenshipSelected ? <span style={errorStyle}>Citizenship not selected!</span> : null}
                                    </Form.Group>

                                    <Form.Group as={Col} id="formGroupDisability">
                                        <Form.Label>Disability</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            className="mr-sm-2" custom
                                            name="disability"
                                            autoComplete="off"
                                            value={disability}
                                            onChange={this.customerChange}
                                            onClick={this.disabilitySelectClick.bind(this)}
                                            isInvalid={!this.state.isDisabilitySelected}>
                                                <option value="0">Choose...</option>
                                                {this.state.disabilityList.map((disability) => (
                                                    <option value={disability.disabilityId} key={disability.disabilityId}>{disability.disabilityName}</option>
                                                ))}
                                        </Form.Control>
                                        {!this.state.isDisabilitySelected ? <span style={errorStyle}>Disability not selected!</span> : null}
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} id="formGroupRetiree">
                                        <Form.Check
                                            type="checkbox"
                                            name="retiree"
                                            label="Retiree?"
                                            autoComplete="off"
                                            checked={retiree}
                                            onChange={this.customerChange}/>
                                    </Form.Group>
                                </Form.Row>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="primary" type="submit" size="sm">
                                <FontAwesomeIcon icon={faSave}/> {this.state.id ? "Update" : "Save"}
                            </Button>{'  '}
                            <Button variant="info" type="reset" size="sm">
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>{'  '}
                            <Button variant="info" type="button" size="sm" onClick={this.customerList.bind()}>
                                <FontAwesomeIcon icon={faList}/> Customer List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
                </Container>
            </div>
        );
    }
}