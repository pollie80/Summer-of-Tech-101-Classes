import { Table } from 'react-bootstrap';
import Config from '../config';
import Ping from '../components/HealthCheck/Ping';

const HealthCheck = () => {
    return (
        <Table bordered hover>
            <tbody>
                <tr>
                    <td>OpenPlatform API</td>
                    <td><Ping /></td>
                </tr>
                <tr>
                    <td>API Base URL</td>
                    <td> {Config.fnzApiUrl} </td>
                </tr>
            </tbody>
        </Table>        

    );
};

export default HealthCheck