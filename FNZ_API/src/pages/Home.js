import { Jumbotron, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Jumbotron>
            <h1>Summer of Tech/FNZ OpenPlatform API Test App</h1>
            <p>This app is designed to allow you to quickly build up a sample app that can talk to the OpenPlatform API.</p>
            
            <Container>
                <Row>
                    <Col md={4}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Get Started</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Do this first</Card.Subtitle>
                                <Card.Text>
                                    Go to the <Link to="/health-check">Health Check</Link> section and make sure your API connectivity is working.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>What else?</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Proxy</Card.Subtitle>
                                <Card.Text>
                                    For various reasons, you'll need to run the node-api-proxy.  See <Link to='/proxy-help'>here</Link> for instructions on how to set this up.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Sample Code</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Worked example of a new page</Card.Subtitle>
                                <Card.Text>
                                    Have a look at this page to see a basic worked example that you can use as a basis for your own pages and components.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    )
}

export default Home;