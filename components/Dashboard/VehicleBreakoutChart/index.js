import { Doughnut } from 'react-chartjs-2';

export default function VehicleBreakoutChart(props) {
    const data = {
        labels: props.labels,
        datasets: [
            {
                label: '',
                data: props.stats,
                backgroundColor: [
                    '#5388D8',
                    '#87BEFF',
                    '#7B7E81',
                    '#00234D',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    '#5388D8',
                    '#87BEFF',
                    '#7B7E81',
                    '#00234D',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <>
            <Doughnut data={data} />
        </>
    )
}