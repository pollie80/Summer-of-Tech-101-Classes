import { Row, Col } from 'react-bootstrap';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Link } from 'react-router-dom';

const envFileCode = `API_URL=https://distributionservicetfsu4.fnz.com/
API_KEY_NAME=
API_KEY_VALUE=
PORT=6767`

const cloneNodeApiProxy = `git clone https://github.com/jesperorb/node-api-proxy.git`

const running = `PS D:\\src\\node-api-proxy> npm start

> node-api-proxy@1.0.0 start D:\\src\\node-api-proxy
> node server.js

+--------------------------------------+
|                                      |
|  [SERVER] Listening on port: 6767    |
|                                      |
+--------------------------------------+`

const Proxy = () => {
    return (
        <Row>
            <Col md={12}>
                <h3>Setup node-api-proxy</h3>
                <p>The test instance of the OpenPlatform API we are using does not currently allow for cross-origin service calls from within the browser.  We can work around this by using a locally hosted proxy.  Set this up as follows:</p>

                <ol>
                    <li>
                        <p>Get a copy of node-api-proxy from github:</p>
                        <SyntaxHighlighter language="git" style={okaidia}>
                            {cloneNodeApiProxy}
                        </SyntaxHighlighter>
                    </li>

                    <li><p>Open up the node-api-proxy folder in VS Code.</p></li>
                    <li>
                        <p>Create a file in the root directory called .env (or make a copy of .env.example and edit that).  The file contents should be:</p>
                        <SyntaxHighlighter language="text" style={okaidia}>
                            {envFileCode}
                        </SyntaxHighlighter>
                    </li>
                    <li>
                        <p>Run the app in a VS Code terminal (or command line) with:</p>
                        <SyntaxHighlighter language="text" style={okaidia}>
                            npm start
                        </SyntaxHighlighter>
                    </li>

                    <li>
                        <p>Once you have this up and running, you should see something like this in your terminal.  Keep the terminal open.</p>
                            <SyntaxHighlighter language="text" style={okaidia}>
                                {running}
                            </SyntaxHighlighter>
                            <p>You will now be able to go to the <Link to='/health-check'>Health Check</Link> page and confirm that the API is available.</p>
                    </li>
                </ol>
            </Col>
        </Row>
    )
};

export default Proxy;