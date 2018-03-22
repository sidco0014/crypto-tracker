import React, {Component} from 'react';
import axios from 'axios';
import './bitcoin.css';
import "react-bootstrap/dist/react-bootstrap.min.js";
// import {Grid, Row, Col} from "react-bootstrap";
// import NumberFormat from 'react-number-format';
import {Line} from 'react-chartjs-2';

let bitcoinPrice = [];
let bitcoinDates = [];

class Bitcoin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cryptos: [],

            chartData: {
                labels: [],
                datasets: [
                    {
                        data: [],
                    }
                ],
            }
        }
    }

    componentDidMount() {
        axios.get('https://api.coindesk.com/v1/bpi/historical/close.json').then(
            res => {
                const crypto = res.data['bpi'];
                Object.entries(crypto).map((res) => {
                    bitcoinPrice.push(res[1]);
                    bitcoinDates.push(res[0]);
                });

                this.setState({cryptos: crypto});
                const charData = {
                    labels: bitcoinDates,
                    datasets: [
                        {
                            data: bitcoinPrice,
                            backgroundColor: '#00ea9c',
                            borderColor: '#fff',
                            fill: false,
                            lineTension: 0,
                            pointRadius: 3,
                        }
                    ],
                };

                this.setState({
                    chartData: charData
                })
            });
    }

    render() {
        return (
            <div className='BitcoinWrapper'>
                <h1 className='BitcoinTitleText'>Bitcoin</h1>
                <div className='InnerWrapperContent'>
                    <Line data={this.state.chartData} width={100} height={50} options={{
                        legend: {
                            display: false,
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    fontColor: '#fff'
                                },
                                gridLines: {
                                    display: false
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontColor: '#fff'
                                },
                                gridLines: {
                                    display: false
                                }
                            }]
                        },
                    }}/>
                </div>
            </div>
        )
    }

}


export default Bitcoin;