import { Table } from 'react-bootstrap'

const InstrumentResults = props => {

    if (props.results == null || props.results.length === 0) {
        return (
            <p>No results. Try changing the filter.</p>
        )
    }
    return (
        <Table>
            <thead>
                <tr>
                    <th>Ticker</th>
                    <th>Instrument Name</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
                {props.results.map((i, key) => {
                    return (
                        <tr key={key}>
                            <td>{i.ticker}</td>
                            <td>{i.name}</td>
                            <td>{i.type}</td>
                        </tr>
                )})}
            </tbody>
        </Table>

    )
}

export default InstrumentResults;
