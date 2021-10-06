import React, { Component } from "react";
import { Bar } from 'react-chartjs-2';



interface BarChartProps {
    chartData: {};
}

interface BarChartState {
    chartData: {};
}

class BarChart extends Component<BarChartProps, BarChartState> {

    public constructor(props: BarChartProps) {
        super(props);
        this.state = { chartData: this.props.chartData };
    }

    public render(): JSX.Element {
        return (
            <div className="BarChart">
                <Bar 
                    data={this.props.chartData}
                    width={1000}
                    height={500}
                    options={{
                        title: {
                            display: true,
                            text: "Top Followed Vacations",
                            fontSize: 25
                        },
                        legend: {
                            labels: {
                                fontColor: "black",
                                fontSize: 18
                            },
                            display: true,
                            position: 'bottom'
                        },
                        scales: {
                            xAxes: [{
                                ticks: {
                                    fontColor: "black",
                                    fontSize: 18
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    fontColor: "black",
                                    fontSize: 18,
                                    max: 10,
                                    min: 0,
                                    stepSize: 1
                                }
                            }]
                        }
                }} />
            </div>
        );
    }
}

export default BarChart;
