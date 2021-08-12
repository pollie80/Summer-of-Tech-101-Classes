import { Row, Col, Button, Alert, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Config from '../config';
import InstrumentResults from '../components/InstrumentSearch/InstrumentResults';

const PaginationAlert = props => {
    const [show, setShow] = useState( { show: true, totalResults: 0, totalDisplayed: 0 });
    if (show && props.totalResults > 0 && props.totalResults > props.displayedResults) {
        return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Oh no!</Alert.Heading>
                <p>
                    Someone forgot to implement pagination.  There are {props.totalResults} results but only {props.displayedResults} are displayed.  Maybe you could implement pagination for us using the 'count' and 'start' query string parameters on the IProducts API!
                </p>
            </Alert>
        )
    }
    return (
        <div></div>
    )
}

const InstrumentSearch = () => {
    const [state, setState] = useState( { 
        filter: {
            productTypes: 'Equity',
            count: "20",
            start: "0"
        },
        totalDisplayed: 0,
        totalResults: 0   
    });

    const handleChange = e => {
        var newFilter = { ...state.filter };
        newFilter[e.target.name] = e.target.value;
        setState({...state, filter: newFilter});
    }

    useEffect( () => {
        var queryString = `${Config.fnzApiUrl}/api/distribution/v3/products?productTypes=${state.filter.productTypes}&start=${state.filter.start}&count=${state.filter.count}`

        if (state.filter.name != null && state.filter.name !== '') {
            queryString += `&name=${state.filter.name}`
        }

        axios.get(`${queryString}`,
            {headers: {...Config.headers}}
        )
        .then (res => {
            setState({...state,
                totalResults: res.data.TotalNumberOfResults, 
                totalDisplayed: res.data.PageOfResults.length,
                data: res.data.PageOfResults.map(
                    (i, key) => {
                        return {
                            key: key,
                            ticker: i.ProductCode,
                            name: i.Name,
                            type: i.Type
                         }}
                )
            });
        })
        .catch(err => {
            console.error(err);
            setState({...state, data: {}});
        })
    }, [state.filter]);

    return (
        <>
        <PaginationAlert totalResults={state.totalResults} displayedResults={state.totalDisplayed} />
        <Row>
            <Col md={12}>
                <h3>Instrument Search</h3>
                <Form>
                    <Form.Group controlId="instrumentSearchForm.InsTypeSelect">
                        <Form.Label>Product Type</Form.Label>
                        <Form.Control as="select" name="productTypes" onChange={handleChange}>
                            <option>Equity</option>
                            <option>Managed Fund</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="instrumentSearchForm.InsTypeSelect">
                        <Form.Label>Name</Form.Label>
                        <Form.Control as="input" name="name" onChange={handleChange}>
                        </Form.Control>
                    </Form.Group>
                </Form>
                <Button>Search</Button>

                <InstrumentResults results={state.data} />
            </Col>
        </Row>
        </>

    );
};

export default InstrumentSearch;