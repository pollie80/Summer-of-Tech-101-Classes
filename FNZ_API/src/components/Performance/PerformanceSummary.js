import { Table, Spinner } from 'react-bootstrap';
const formatMoney = value => {
    if (value < 0) {
        return '-$' + Math.abs(value).toLocaleString('en-NZ', {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }
    return '$' + value.toLocaleString('en-NZ', {minimumFractionDigits: 2, maximumFractionDigits: 2})
}

const formatPercent = value => {
    return (value * 100).toLocaleString('en-NZ', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '%'
}
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
export default PerformanceSummary;
