import { Row, Col } from 'react-bootstrap';
import SampleContainer from '../components/Samples/SampleContainer'
import PingSample from '../components/Samples/PingSample'

const codeSamples = [
    PingSample
]

const Samples = () => {
    return (
        <>
            <Row>
                <Col md={12}>
                    <h3>Sample code and patterns</h3>
                </Col>
            </Row>
            <SampleContainer samples={codeSamples} />
        </>   
    )
}

export default Samples;