import axios from 'axios';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import AccountSelector from '../components/Performance/AccountSelector';
import PerformanceSummary from '../components/Performance/PerformanceSummary';
import PerformanceChart from '../components/Performance/PerformanceChart'
import Config from '../config';

const Performance = () => {
    const [state, setState] = useState( { selectedAccount: 'none', loading: false } )
    
    const handleAccountChange = acct => {
        setState({...state, selectedAccount: acct, loading: true })
    }

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
                chartData: formatChartData(res.data.PerformanceSummaryChartData.PerformanceSeriesData)}
            )})
        .catch(err => {
            console.error(err);
        });
    }, [state.selectedAccount])    

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
                <PerformanceChart chartData={state.chartData} loading={state.loading} />
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <PerformanceSummary displayData={state.displayData} loading={state.loading} />
            </Col>
        </Row>
        </>            
    )
}

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

const formatChartData = data => {
    return data.map(d => {
        return [new Date(d.Date).getTime(), d.ReturnValue];
    });
}

export default Performance;
