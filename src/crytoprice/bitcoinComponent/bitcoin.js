import React, {Component} from 'react';
import axios from 'axios';
import './bitcoin.css';
import "react-bootstrap/dist/react-bootstrap.min.js";
import {Line} from 'react-chartjs-2';

let BitcoinPrice = [];
let BitcoinDate = [];
let BitcoinData = [];

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
            LastUpdatedBitcoinChange: '',
        }
    }

    getLastBitcoinPricedData(BitcoinPriceArr) {
        let BitcoinPriceChange = '';
        let BitcoinPercentChange = '';
        let lastPrice = BitcoinPriceArr[BitcoinPriceArr.length - 1];
        let firstPrice = BitcoinPriceArr[0];
        let diff = lastPrice - firstPrice;
        diff = Math.round(diff * 100) / 100;
        let percent = (diff / firstPrice) * 100;
        percent = Math.round(percent * 100) / 100;
        if (diff > 0) {
            BitcoinPriceChange = '+$' + diff;
            BitcoinPercentChange = percent + '%';
        }
        else {
            BitcoinPriceChange = '-$' + (-1*diff);
            BitcoinPercentChange = percent + '%';
            console.log(BitcoinPercentChange);
        }
        this.setState({
            LastUpdatedBitcoinPrice: BitcoinPriceChange,
            LastUpdatedBitcoinChange: BitcoinPercentChange
        })
    }

    componentDidMount() {
        axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=30&aggregate=1').then(
            res => {
                const crypto = res.data['Data'];
                Object.entries(crypto).map((res) => {
                    BitcoinData.push(res[1]);
                });
                Object.entries(BitcoinData).map((result) => {
                    BitcoinPrice.push(result[1].open);
                    let DateObj = new Date(result[1].time * 1000);
                    let monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ];
                    let day = DateObj.getDate();
                    let month = DateObj.getMonth();
                    let year = DateObj.getFullYear();
                    let newDate = day + " " + monthNames[month] + ", " + year;
                    BitcoinDate.push(newDate.toString());
                });
                this.getLastBitcoinPricedData(BitcoinPrice);
                const charData = {
                    labels: BitcoinDate,
                    datasets: [
                        {
                            data: BitcoinPrice,
                            backgroundColor: '#fff',
                            borderColor: '#00ea9c',
                            fill: false,
                            lineTension: 0,
                            pointRadius: 3,
                        }
                    ],
                };
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
                    <h4>{this.state.LastUpdatedBitcoinPrice} ({this.state.LastUpdatedBitcoinChange}) PAST MONTH</h4>
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