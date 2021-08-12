# Bootcamp Walkthrough

## Getting Started

To work on this project, you'll need a [git client](https://git-scm.com/downloads), [Visual Studio Code](https://code.visualstudio.com/download) or some similar editor that you know how to use, and a reasonably up to date version of [NodeJS](https://nodejs.org/en/download/).

To access the OpenPlatform API endpoint, you'll need to set up a local proxy.  This is due to the CORS settings on the API host that we don't want to change at the moment.

### **Get and set the node-api-proxy**

This is available on github:
```
git clone https://github.com/jesperorb/node-api-proxy.git
```

Open up the node-api-proxy folder in Visual Studio Code and create a file in the top level folder called .env (note the leading dot).  The contents of this file should be:

```
API_URL=https://distributionservicetfsu4.fnz.com/
API_KEY_NAME=
API_KEY_VALUE=
PORT=6767
```

Either from Visual Studio Code terminal (CTRL+`) or from a command line, run:

```
npm install
npm start
```

And you should eventually see something like:

```
+--------------------------------------+
|                                      |
|  [SERVER] Listening on port: 6767    |
|                                      |
+--------------------------------------+
```


### **Get the starter app**

If you really want to, you can just go it alone and create everything for scratch.  To make the most of your time here tonight, you probably want to use our starter React app:

```
git clone https://github.com/joshsaunders/fnzapp.git
```

Open up the fnzapp folder in Visual Studio Code.  I'll walk you through the structure of the app as a group.

Start the app by running the following commands in the command line or in the VS Code embedded terminal:

```
npm install
npm start
```

The website will start up on localhost, port 3000.

If everything is set up properly, you should be able to go to the [health-check](http://localhost:3000/health-check) page and get a positive ping response from the OpenPlatform API.

### **Getting API documentation**
You can get API documentation here: [FNZ Service API Documentation](https://distributionservicetfsu4.fnz.com/api/distribution/v3/docs/Catalogue/Index/78/).

Direct links to some useful services:

* [Ping](https://distributionservicetfsu4.fnz.com/api/distribution/v3/docs/Catalogue/Index/78/operation/478715010/Request) - useful to test things.
* [Accounts](https://distributionservicetfsu4.fnz.com/api/distribution/v3/docs/Catalogue/Index/78/operation/1330771012/Request)
* [Performance Summary](https://distributionservicetfsu4.fnz.com/api/distribution/v3/docs/Catalogue/Index/78/operation/1464623772/Request)

## Building the performance summary page
I will show you a finished version of the performance summary page for you to build.  The following are the instructions for bringing this together:

### **Add a new page**

1. In the `pages` folder, create a new file called Performance.js.
2. Add the following code:

```
import { Row, Col } from 'react-bootstrap';

const Performance = () => {
    return (
        <Row>
            <Col md={12}>
                <h3>Performance Summary</h3>
            </Col>
        </Row>
    )
}

export default Performance;
```

3. In index.js, hook up the new Performance page to the site navigation and routing:

Near the top with all the other imports.

```
import Performance from './pages/Performance'; 
```

Inside the `<Nav>` block, with the other ``<LinkContainer>`` elements:

```
<LinkContainer to="/performance"><Nav.Link>Performance Summary</Nav.Link></LinkContainer>
```

And inside the `<Switch>` section:
```
<Route path="/performance">
    <Performance />
</Route>
```

Save everything and launch your site/refresh your browser and you should see the Performance Summary menu item at the top.  Click it and you should be taken to the **Performance Summary** page, showing just the header at this stage.

### **Account selection**

To get performance data, we need to select an account.  Let's create an account search component.

1. In the `components` directory, create a folder called `Performance`.
2. Inside the `components/Performance` directory, create a file called AccountSelector.js.

3. Create the UI:

```
import { Form } from 'react-bootstrap';

const AccountSelector = props => {
    return (
        <Form>
            <Form.Group controlId="accountSelector.Select">
                <Form.Label>Select account</Form.Label>
                <Form.Control as="select" name="selectedAccount" onChange={handleChange}>
                    <option value="none">Select account...</option>
                </Form.Control>
            </Form.Group>
        </Form>
    )
};

export default AccountSelector;
```

4. Render your new `AccountSelector` component on the Performance Summary page.  Update `Performance,js` to import the new component and render it on the UI.  The entire file should now look like this:

```
import { Row, Col } from 'react-bootstrap';
import AccountSelector from '../components/Performance/AccountSelector';

const Performance = () => {
    return (
        <>
        <Row>
            <Col md={12}>
                <h3>Performance Summary</h3>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <AccountSelector />
            </Col>
        </Row>
        </>
    )
}

export default Performance;
```

5. Call the `Accounts` API to get a list of accounts to work with.  Back in `AccountSelector.js`, add the following imports:

```
import { useState, useEffect } from 'react';
import axios from 'axios';
import Config from '../../config'
```

6. Then, above the `return`, but still inside the `AccountSelector` definition, add the following code.  There's a bit of React and javascript peculiarities here so if you're not familiar with it, I'll walk through this code with you as we go through the workshop.

```
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
```

7. Now populate the dropdown box with the list of accounts that we get back.  Edit the `<Form.Control>` element in `AccountSelector` to create `<option>` elements in the dropdown:

```
<Form.Control as="select" name="selectedAccount">
    <option value="none">Select account...</option>
    {state.accountList.map((acct, key) => {
        return (
            <option key={key} value={acct.hierarchyId}>{acct.accountId} - {acct.name}</option>
    )})}
</Form.Control>
```

The account selector should now be functional on your Performance Summary page.

8. Finally, we'd like to be able to call a function whenever someone changes the value in the dropdown.  Add the following immediately after the `const AccountSelector = props => {`

```
const handleChange = e => {
    props.onChange(e.target.value)
};
```

9. And update the `<Form.Control>` element to:

```
<Form.Control as="select" name="selectedAccount" onChange={handleChange}>
```

The finished `AccountSelector.js` should look like this:

```
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
```

### **Get the performance summary from the API**

Now let's look up performance data for the selected account.  


1. Add the following imports to `Performance.js`.

```
import axios from 'axios';
import { useState, useEffect } from 'react';
import Config from '../config';
```

2. The following function will be passed into the `AccountSelector` component as a prop to be called whenever the selected account is updated.  Add it somewhere inside the enclosing `Performance` component:

```
const [state, setState] = useState( { selectedAccount: 'none', loading: false } )

const handleAccountChange = acct => {
    setState({...state, selectedAccount: acct, loading: true })
}
```

3. And change the `AccountSelector` tag in the `return` block to pass it into the `AccountSelector` component as a prop.

```
<AccountSelector onChange={handleAccountChange} />
```

Now it's time to make the actual call to the API to gather the performance data.

4. Add the following hook to call the performance service whenever the selected account changes:

```
useEffect( () => {
    if (state.selectedAccount == 'none') {
        return;
    }
    var queryString = `${Config.fnzApiUrl}/api/distribution/v3/Portfolio/${state.selectedAccount}/PerformanceSummary?fromDate=2000-01-01&toDate=2021-08-10`

    setState( { ...state, loading: true } )
    
    axios.get(queryString,
        {headers: {...Config.headers}})
    .then(res => {
        setState({...state, 
            loading: false,
            displayData: formatDisplayData(res.data.DisplayData)
        })})
    .catch(err => {
        console.error(err);
    });
}, [state.selectedAccount])    
```

5. We also need a way to map the data we get back from the API into a useful format.  Sorry about this one: you might want to copy/paste and put this at the bottom of the file where you don't have to look at it.

```
const formatDisplayData = data => {
    return {
        openingValue: {
            taxYTD: data[1].PerformanceSummary.OpeningValue,
            oneYear: data[2].PerformanceSummary.OpeningValue,
            threeYear: data[3].PerformanceSummary.OpeningValue,
            fiveYear: data[4].PerformanceSummary.OpeningValue,
            fromInception: data[5].PerformanceSummary.OpeningValue
        },
        capitalIn: {
            taxYTD: data[1].PerformanceSummary.CapitalIn,
            oneYear: data[2].PerformanceSummary.CapitalIn,
            threeYear: data[3].PerformanceSummary.CapitalIn,
            fiveYear: data[4].PerformanceSummary.CapitalIn,
            fromInception: data[5].PerformanceSummary.CapitalIn
        },
        capitalOut: {
            taxYTD: data[1].PerformanceSummary.CapitalOut,
            oneYear: data[2].PerformanceSummary.CapitalOut,
            threeYear: data[3].PerformanceSummary.CapitalOut,
            fiveYear: data[4].PerformanceSummary.CapitalOut,
            fromInception: data[5].PerformanceSummary.CapitalOut
        },
        realisedGain: {
            taxYTD: data[1].PerformanceSummary.RealisedGain,
            oneYear: data[2].PerformanceSummary.RealisedGain,
            threeYear: data[3].PerformanceSummary.RealisedGain,
            fiveYear: data[4].PerformanceSummary.RealisedGain,
            fromInception: data[5].PerformanceSummary.RealisedGain
        },
        unrealisedGain: {
            taxYTD: data[1].PerformanceSummary.UnrealisedGain,
            oneYear: data[2].PerformanceSummary.UnrealisedGain,
            threeYear: data[3].PerformanceSummary.UnrealisedGain,
            fiveYear: data[4].PerformanceSummary.UnrealisedGain,
            fromInception: data[5].PerformanceSummary.UnrealisedGain
        },
        income: {
            taxYTD: data[1].PerformanceSummary.Income,
            oneYear: data[2].PerformanceSummary.Income,
            threeYear: data[3].PerformanceSummary.Income,
            fiveYear: data[4].PerformanceSummary.Income,
            fromInception: data[5].PerformanceSummary.Income
        },
        expenses: {
            taxYTD: data[1].PerformanceSummary.Expenses,
            oneYear: data[2].PerformanceSummary.Expenses,
            threeYear: data[3].PerformanceSummary.Expenses,
            fiveYear: data[4].PerformanceSummary.Expenses,
            fromInception: data[5].PerformanceSummary.Expenses
        },
        closingValue: {
            taxYTD: data[1].PerformanceSummary.ClosingValue,
            oneYear: data[2].PerformanceSummary.ClosingValue,
            threeYear: data[3].PerformanceSummary.ClosingValue,
            fiveYear: data[4].PerformanceSummary.ClosingValue,
            fromInception: data[5].PerformanceSummary.ClosingValue
        },
        closingIdbnr: {
            taxYTD: data[1].PerformanceSummary.ClosingIdbnr,
            oneYear: data[2].PerformanceSummary.ClosingIdbnr,
            threeYear: data[3].PerformanceSummary.ClosingIdbnr,
            fiveYear: data[4].PerformanceSummary.ClosingIdbnr,
            fromInception: data[5].PerformanceSummary.ClosingIdbnr
        },
        twr: {
            taxYTD: data[1].Twr,
            oneYear: data[2].Twr,
            threeYear: data[3].TwrAnnualised,
            fiveYear: data[4].TwrAnnualised,
            fromInception: data[5].TwrAnnualised
        }
    }
}
```

If you select an account from the dropdown, you should see the performance API being called in the Network tab on the browser dev tools.  You can add a `console.log` to the `.then` handler above to see the data that comes back.

### Build a performance summary component

Now we need a way to actual render the expected performance summary table on the screen.  This is a display-only component so let's just get right to it:

1. Create a file in your `components/Performance` directory called `PerformanceSummary.js`.

2. Import some UI widgets:

```
import { Table, Spinner } from 'react-bootstrap';
```

3. Create a couple of helper methods for making the numbers look nice.

```
const formatMoney = value => {
    if (value < 0) {
        return '-$' + Math.abs(value).toLocaleString('en-NZ', {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }
    return '$' + value.toLocaleString('en-NZ', {minimumFractionDigits: 2, maximumFractionDigits: 2})
}

const formatPercent = value => {
    return (value * 100).toLocaleString('en-NZ', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '%'
}
```

4. And here's the code for rendering the table:

```
const PerformanceSummary = props => {
    if (props.loading) {
        return (<Spinner animation="border"></Spinner>)
    }

    if (!props.displayData) {
        return (<div></div>);
    };

    return (
        <Table>
            <thead>
                <tr>
                    <th></th>
                    <th>Tax YTD</th>
                    <th>One Year</th>
                    <th>Three Years</th>
                    <th>Five Years</th>
                    <th>Since Inception</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><b>Return (TWR)</b></td>
                    <td><b>{formatPercent(props.displayData.twr.taxYTD)}</b></td>
                    <td><b>{formatPercent(props.displayData.twr.oneYear)}</b></td>
                    <td><b>{formatPercent(props.displayData.twr.threeYear)}</b></td>
                    <td><b>{formatPercent(props.displayData.twr.fiveYear)}</b></td>
                    <td><b>{formatPercent(props.displayData.twr.fromInception)}</b></td>
                </tr>
                <tr>
                    <td><b>Opening net value</b></td>
                    <td><b>{formatMoney(props.displayData.openingValue.taxYTD)}</b></td>
                    <td><b>{formatMoney(props.displayData.openingValue.oneYear)}</b></td>
                    <td><b>{formatMoney(props.displayData.openingValue.threeYear)}</b></td>
                    <td><b>{formatMoney(props.displayData.openingValue.fiveYear)}</b></td>
                    <td><b>{formatMoney(props.displayData.openingValue.fromInception)}</b></td>
                </tr>
                <tr>
                    <td>Capital in</td>
                    <td>{formatMoney(props.displayData.capitalIn.taxYTD)}</td>
                    <td>{formatMoney(props.displayData.capitalIn.oneYear)}</td>
                    <td>{formatMoney(props.displayData.capitalIn.threeYear)}</td>
                    <td>{formatMoney(props.displayData.capitalIn.fiveYear)}</td>
                    <td>{formatMoney(props.displayData.capitalIn.fromInception)}</td>
                </tr>
                <tr>
                    <td>Capital out</td>
                    <td>{formatMoney(props.displayData.capitalOut.taxYTD)}</td>
                    <td>{formatMoney(props.displayData.capitalOut.oneYear)}</td>
                    <td>{formatMoney(props.displayData.capitalOut.threeYear)}</td>
                    <td>{formatMoney(props.displayData.capitalOut.fiveYear)}</td>
                    <td>{formatMoney(props.displayData.capitalOut.fromInception)}</td>
                </tr>
                <tr>
                    <td>Realised gains/losses</td>
                    <td>{formatMoney(props.displayData.realisedGain.taxYTD)}</td>
                    <td>{formatMoney(props.displayData.realisedGain.oneYear)}</td>
                    <td>{formatMoney(props.displayData.realisedGain.threeYear)}</td>
                    <td>{formatMoney(props.displayData.realisedGain.fiveYear)}</td>
                    <td>{formatMoney(props.displayData.realisedGain.fromInception)}</td>
                </tr>
                <tr>
                    <td>Unrealised gains/losses</td>
                    <td>{formatMoney(props.displayData.unrealisedGain.taxYTD)}</td>
                    <td>{formatMoney(props.displayData.unrealisedGain.oneYear)}</td>
                    <td>{formatMoney(props.displayData.unrealisedGain.threeYear)}</td>
                    <td>{formatMoney(props.displayData.unrealisedGain.fiveYear)}</td>
                    <td>{formatMoney(props.displayData.unrealisedGain.fromInception)}</td>
                </tr>
                <tr>
                    <td>Income</td>
                    <td>{formatMoney(props.displayData.income.taxYTD)}</td>
                    <td>{formatMoney(props.displayData.income.oneYear)}</td>
                    <td>{formatMoney(props.displayData.income.threeYear)}</td>
                    <td>{formatMoney(props.displayData.income.fiveYear)}</td>
                    <td>{formatMoney(props.displayData.income.fromInception)}</td>
                </tr>
                <tr>
                    <td>Expenses</td>
                    <td>{formatMoney(props.displayData.expenses.taxYTD)}</td>
                    <td>{formatMoney(props.displayData.expenses.oneYear)}</td>
                    <td>{formatMoney(props.displayData.expenses.threeYear)}</td>
                    <td>{formatMoney(props.displayData.expenses.fiveYear)}</td>
                    <td>{formatMoney(props.displayData.expenses.fromInception)}</td>
                </tr>
                <tr>
                    <td>Closing value</td>
                    <td>{formatMoney(props.displayData.closingValue.taxYTD)}</td>
                    <td>{formatMoney(props.displayData.closingValue.oneYear)}</td>
                    <td>{formatMoney(props.displayData.closingValue.threeYear)}</td>
                    <td>{formatMoney(props.displayData.closingValue.fiveYear)}</td>
                    <td>{formatMoney(props.displayData.closingValue.fromInception)}</td>
                </tr>
                <tr>
                    <td>Closing IDBNR</td>
                    <td>{formatMoney(props.displayData.closingIdbnr.taxYTD)}</td>
                    <td>{formatMoney(props.displayData.closingIdbnr.oneYear)}</td>
                    <td>{formatMoney(props.displayData.closingIdbnr.threeYear)}</td>
                    <td>{formatMoney(props.displayData.closingIdbnr.fiveYear)}</td>
                    <td>{formatMoney(props.displayData.closingIdbnr.fromInception)}</td>
                </tr>
                <tr>
                    <td><b>Closing net value</b></td>
                    <td><b>{formatMoney(props.displayData.closingValue.taxYTD + props.displayData.closingIdbnr.taxYTD)}</b></td>
                    <td><b>{formatMoney(props.displayData.closingValue.oneYear + props.displayData.closingIdbnr.oneYear)}</b></td>
                    <td><b>{formatMoney(props.displayData.closingValue.threeYear + props.displayData.closingIdbnr.threeYear)}</b></td>
                    <td><b>{formatMoney(props.displayData.closingValue.fiveYear + props.displayData.closingIdbnr.fiveYear)}</b></td>
                    <td><b>{formatMoney(props.displayData.closingValue.fromInception + props.displayData.closingIdbnr.fromInception )}</b></td>
                </tr>
            </tbody>
        </Table>
    )
}
```

5. Export the `PerformanceSummary` component so we can use it on our page.

```
export default PerformanceSummary;
```

### Render the `PerformanceSummary` component

Now it's time to pull everything together.

1.  `Performance.js`, import your new `PerformanceSummary` component.

```
import PerformanceSummary from '../components/Performance/PerformanceSummary';
```

2. Update your render block to add in the `PerformanceSummary` component.  Note we pass the performance summary data we mapped, as well as the loading state of the component, through as props.

```
return (
    <>
    <Row>
        <Col md={12}>
            <h3>Performance Summary</h3>
        </Col>
    </Row>
    <Row>
        <Col md={12}>
            <AccountSelector onChange={handleAccountChange} />
        </Col>
    </Row>
    <Row>
        <Col md={12}>
            <PerformanceSummary displayData={state.displayData} loading={state.loading} />
        </Col>
    </Row>
    </>
)
```

3. Start up your site and/or refresh your browser.  Select an account and watch in awe as the data is retrieved and displayed on the screen.

### Create the charting component

For a nice finishing touch, let's add in the performance graph.  We'll use the Highcharts library and its official React wrapper to quickly render a nice looking graph on our web page.

1. In the terminal, get `highcharts` and `highcharts-react-official` packages:

```
npm i npm install highcharts highcharts-react-official
```

2. The performance service returns the data we need to draw the graph.  Let's create another mapper at the bottom of `Performance.js` to get it into a state that Highcharts can consume it.  The key thing here is, Highcharts expects an array of (x, y) pairs, with the date formatted as milleseconds after the epoch.

```
const formatChartData = data => {
    return data.map(d => {
        return [new Date(d.Date).getTime(), d.ReturnValue];
    });
}
```

3. Create a new file in `./components/Performance` called `PerformanceChart.js`.

4. Import some things:

```
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Spinner } from 'react-bootstrap';
```

5. We want to show the spinner when we're loading, and render nothing if there's no data to display.  This is just like the `PerformanceSummary` component.

```
const PerformanceChart = props => {
    if (props.loading) {
        return (<Spinner animation="border"></Spinner>)
    }
    
    if (!props.chartData) {
        return (<div></div>);
    };
```

6. Once we have some data, use the `HighchartsReact` component to render the chart.

```
    var options = {
        title: {
            text: 'Performance'
        },
        xAxis: {
            title: {
                text: 'Date'
            }
        },
        series: [{
            name: 'Performance',
            data: props.chartData
        }]
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    )
}
```

7. Don't forget to export.

```
export default PerformanceChart;
```

The completed component looks like this:

```
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Spinner } from 'react-bootstrap';

const PerformanceChart = props => {
    if (props.loading) {
        return (<Spinner animation="border"></Spinner>)
    }

    if (!props.chartData) {
        return (<div></div>);
    };

    var options = {
        title: {
            text: 'Performance'
        },
        xAxis: {
            title: {
                text: 'Date'
            }
        },
        series: [{
            name: 'Performance',
            data: props.chartData
        }]
    };
    
    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    )
}

export default PerformanceChart;
```

### Render the performance graph

To render the new `PerformanceChart` component, we'll do something similar to what we did with the `PerformanceSummary` table.

1. Import it:

```
import PerformanceChart from '../components/Performance/PerformanceChart'
```

2. Update the render block:

```
<Row>
    <Col md={12}>
        <PerformanceChart chartData={state.chartData} loading={state.loading} />
    </Col>
</Row>
```

3. Use the functions previously defined to map the data from the API into the `chartData` prop on the `PerformanceChart` component.

```
    useEffect( () => {
        if (state.selectedAccount == 'none') {
            return;
        }
        var queryString = `${Config.fnzApiUrl}/api/distribution/v3/Portfolio/${state.selectedAccount}/PerformanceSummary?fromDate=2000-01-01&toDate=2021-08-10`

        setState( { ...state, loading: true } )
        
        axios.get(queryString,
            {headers: {...Config.headers}})
        .then(res => {
            console.log(res.data);
            setState({...state, 
                loading: false,
                displayData: formatDisplayData(res.data.DisplayData),
                chartData: formatChartData(res.data.PerformanceSummaryChartData.PerformanceSeriesData)
            })})
        .catch(err => {
            console.error(err);
        });
    }, [state.selectedAccount])    
```

The performance chart should now render along with the table when you select an account.