import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Performance from './pages/Performance'; 

// import './index.css';
import HealthCheck from './pages/HealthCheck';
import Home from './pages/Home';
import Proxy from './pages/Proxy';
import Samples from './pages/Samples';

import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <Container>
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#">FNZ App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/performance"><Nav.Link>Performance Summary</Nav.Link></LinkContainer>
            <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
            <LinkContainer to="/health-check"><Nav.Link>Health Check</Nav.Link></LinkContainer>
            <LinkContainer to="/proxy-help"><Nav.Link>Proxy</Nav.Link></LinkContainer>
            <LinkContainer to="/samples"><Nav.Link>Samples</Nav.Link></LinkContainer>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Row>
          <Col md={12}>
            <Switch>
                <Route path="/performance">
                    <Performance />
                </Route>

              <Route path="/samples">
                <Samples />
              </Route>
              <Route path="/proxy-help">
                <Proxy />
              </Route>
              <Route path="/health-check">
                <HealthCheck />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
           </Switch>
          </Col>
        </Row>
        
      </Router>    
    </Container>  
  </React.StrictMode>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
