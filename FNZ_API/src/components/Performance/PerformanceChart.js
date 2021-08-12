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
