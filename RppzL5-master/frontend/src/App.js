import React from 'react';
import './App.css';

import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Footer from './components/Footer'
import Customer from './components/Customer';
import CustomerList from './components/CustomerList';
import AddOperation from './components/AddOperation';
import BankAccountsList from './components/BankAccountsList';
import OperationList from './components/OperationList';


function App() {
  const marginTop = {
    marginTop: "20px"
  }

  return (
    <Router>
      <NavigationBar />
      <Container style={{maxWidth: '100%'}}>
          <Row>
            <Col lg={12} style={marginTop}>
              <Switch>
                <Route exact path="/" exact component={Welcome}/>
                <Route path="/addCustomer" exact component={Customer}/>
                <Route path="/edit/:id" exact component={Customer}/>
                <Route path="/customersList" exact component={CustomerList}/>
                <Route exact path="/addOperation" component={AddOperation}/>
                <Route exact path="/bankAccounts" component={BankAccountsList}/>
                <Route exact path="/operations" component={OperationList}/>
              </Switch>
            </Col>
          </Row>
      </Container>
      <Footer style={marginTop}/>
    </Router>
  );
}

export default App;
