import { Line } from 'react-chartjs-2';
import React from "react"

export default function TotalRevenueChart(props) {
    const data = {
        labels: props.labels,
        datasets: [
            {
                label: 'Per Day Revenue',
                data: props.revenue,
                fill: true,
                backgroundColor: 'white',
                borderColor: '#3570B5',
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };
    return (
        <>
            <Line data={data} options={options} />
        </>
    )
}