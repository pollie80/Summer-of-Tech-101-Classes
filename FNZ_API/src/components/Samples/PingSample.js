const PingSample = {
    key: 'ping',
    title: 'Call Ping service',
    content: `
    import axios from 'axios' // Promise-based http client.
    import Config from '../../config' // Get the API base URL here.

    import { useState, useEffect } from 'react';
    
    const [state, setPing] = useState( { status: "Pending" } )

    const Ping = () => {

        useEffect( () => {
            axios.get(Config.fnzApiUrl + '/api/distribution/ping') // Call the API.
                .then(res => { // Runs on success
                    setPing( state => ({...state, status: "Ok", lastError: ''}))
                })
                .catch(err => { // Runs on error
                    setPing( state => ({...state, status: "Error", lastError: err}))
                })
        }, [setPing]) // use setPing as a dependency so ping service only gets called once.
    
        return (
            <h1>Ping status: {state.status}</h1>
        )
    }
    
    export default Ping;
    `
}

export default PingSample;
