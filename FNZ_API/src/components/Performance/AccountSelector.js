import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Config from '../../config'

const AccountSelector = props => {

    const handleChange = e => {
        props.onChange(e.target.value)
    };
    
    const [state, setState] = useState({ accountList: [] });

    useEffect( () => {
        axios.get(`${Config.fnzApiUrl}/api/distribution/v3/accounts?accountStatus=Active&accountType=Individual&count=100`,
            {headers: {...Config.headers}})
        .then(res => {
            setState({...state, 
                accountList: res.data.PageOfResults.map(
                    (acct, key) => {
                        return {
                            key: key,
                            hierarchyId: acct.HierarchyId,
                            accountId: acct.AccountId,
                            name: acct.Name.Full
                        }}
                )});
        })
        .catch(err => {
            console.error(err);
        })
    }, [setState])

    return (
        <Form>
            <Form.Group controlId="accountSelector.Select">
                <Form.Label>Select account</Form.Label>
                <Form.Control as="select" name="selectedAccount" onChange={handleChange}>
                    <option value="none">Select account...</option>
                    {state.accountList.map((acct, key) => {
                        return (
                            <option key={key} value={acct.hierarchyId}>{acct.accountId} - {acct.name}</option>
                    )})}
                </Form.Control>
            </Form.Group>
        </Form>
    )
};

export default AccountSelector;
