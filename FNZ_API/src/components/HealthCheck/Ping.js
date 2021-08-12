import axios from 'axios'
import Config from '../../config'

import { useState, useEffect, useRef } from 'react';
import { Badge, Spinner } from 'react-bootstrap';

const Ping = () => {

    const errorTipTarget = useRef(null);

    const [state, setPing] = useState( { status: "Pending", showErrorTip: false })

    useEffect( () => {
        axios.get(Config.fnzApiUrl + '/api/distribution/ping')
            .then(res => {
                console.log(res.data)
                setPing( state => ({...state, status: "Ok", lastError: ''}))
            })
            .catch(err => {
                console.log(err)
                setPing( state => ({...state, status: "Error", lastError: err}))
            })
    }, [setPing])

    switch (state.status) {
        case "Ok":
            return <Badge variant="success">Ok</Badge>
        case "Pending":
            return <Spinner animation="grow"></Spinner>
        case "Error":
            return (    
                <Badge ref={errorTipTarget} variant="danger">Error</Badge>
            );
        default:
            return <p>Unknown</p>
    }
}

export default Ping;

