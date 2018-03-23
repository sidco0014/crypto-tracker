import React, {Component} from 'react';
import axios from 'axios';
import './bitcoin.css';
import "react-bootstrap/dist/react-bootstrap.min.js";
// import {Grid, Row, Col} from "react-bootstrap";
// import NumberFormat from 'react-number-format';
import {Line} from 'react-chartjs-2';

let bitcoinPrice = [];
let bitcoinDates = [];
let lastPrice;
let lastUpdatedOn;
let formatedDated;
let formatedDateStr = '';

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
            },
            LastUpdatedBitcoinPrice: '',
            lastUpdatedBitcoinDate: '',
        }
    }

    formatDate(lastUpdatedOn) {
        formatedDated = String(lastUpdatedOn).split('-');
        formatedDated = formatedDated.reverse();

        if (formatedDated[1] === '01') {
            formatedDated.push('January');
        }
        else if (formatedDated[1] === '02') {
            formatedDated.push('February');
        }
        else if (formatedDated[1] === '03') {
            formatedDated.push('March');
        }
        else if (formatedDated[1] === '04') {
            formatedDated.push('April');
        }
        else if (formatedDated[1] === '05') {
            formatedDated.push('May');
        }
        else if (formatedDated[1] === '06') {
            formatedDated.push('June');
        }
        else if (formatedDated[1] === '07') {
            formatedDated.push('July');
        }
        else if (formatedDated[1] === '08') {
            formatedDated.push('August');
        }
        else if (formatedDated[1] === '09') {
            formatedDated.push('September');
        }
        else if (formatedDated[1] === '10') {
            formatedDated.push('October');
        }
        else if (formatedDated[1] === '11') {
            formatedDated.push('November');
        }
        else if (formatedDated[1] === '12') {
            formatedDated.push('December');
        }

        formatedDateStr = formatedDated[0] + " " + formatedDated[3] + ", " + formatedDated[2];
        this.setState({lastUpdatedBitcoinDate: formatedDateStr});
    }

    roundBitcoinPrice(lastPrice) {
        this.setState({LastUpdatedBitcoinPrice: '$ ' + Math.round(lastPrice * 100) / 100});
    }

    componentDidMount() {
        axios.get('https://api.coindesk.com/v1/bpi/historical/close.json').then(
            res => {
                const crypto = res.data['bpi'];
                Object.entries(crypto).map((res) => {
                    bitcoinPrice.push(res[1]);
                    bitcoinDates.push(res[0]);
                });
                const charData = {
                    labels: bitcoinDates,
                    datasets: [
                        {
                            data: bitcoinPrice,
                            backgroundColor: '#fff',
                            borderColor: '#00ea9c',
                            fill: false,
                            lineTension: 0,
                            pointRadius: 3,
                        }
                    ],
                };
                lastPrice = bitcoinPrice[bitcoinPrice.length - 1];
                lastUpdatedOn = bitcoinDates[bitcoinDates.length - 1];
                this.formatDate(lastUpdatedOn);
                this.roundBitcoinPrice(lastPrice);
                this.setState({cryptos: crypto});
                this.setState({
                    chartData: charData
                })
            });
    }

    render() {
        return (
            <div className='BitcoinWrapper'>
                <h1 className='BitcoinTitleText'>Bitcoin</h1>
                <div className='LastBitcoinPriceDate'>
                    <h2>{this.state.LastUpdatedBitcoinPrice}</h2>
                    <h2>{this.state.lastUpdatedBitcoinDate}</h2>
                </div>

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