import { Tab, Row, Col, Nav } from 'react-bootstrap';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SampleContainer = props => { 
    return (
        <Tab.Container id="code-samples" defaultActiveKey="default">
            <Row>
                <Col md={2}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item><Nav.Link eventKey="default">About this page</Nav.Link></Nav.Item>
                        {props.samples.map(s => <Nav.Item><Nav.Link eventKey={s.key}>{s.title}</Nav.Link></Nav.Item>)}
                    </Nav>
                </Col>
                <Col md={10}>
                    <Tab.Content>
                        <Tab.Pane eventKey="default">
                            Choose a sample on the left.
                        </Tab.Pane>
                        {props.samples.map(s => <Tab.Pane eventKey={s.key}>
                            <SyntaxHighlighter language="javascript" style={okaidia}>
                                {s.content}
                            </SyntaxHighlighter>
                        </Tab.Pane>)}

                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export default SampleContainer;