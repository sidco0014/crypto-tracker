import React, {Component} from 'react';
import axios from 'axios';
import './Ethereum.css';
import {Line} from 'react-chartjs-2';

let EthereumPrice = [];
let EthereumDate = [];
let lastPrice;
let lastUpdatedOn;
let EthObjectData = [];

class Ethereum extends Component {

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
            LastUpdatedEthereumPrice: '',
            lastUpdatedEthereumDate: '',
        }
    }

    componentDidMount() {
        axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=30&aggregate=1').then(
            res => {
                const crypto = res.data['Data'];
                Object.entries(crypto).map((res) => {
                    EthObjectData.push(res[1]);
                });
                Object.entries(EthObjectData).map((result) => {
                    EthereumPrice.push(result[1].open);
                    let DateObj = new Date(result[1].time * 1000);
                    let monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ];
                    let day = DateObj.getDate();
                    let month = DateObj.getMonth();
                    let year = DateObj.getFullYear();
                    let newDate = day + " " + monthNames[month] + ", " + year;
                    EthereumDate.push(newDate.toString());
                });

                const charData = {
                    labels: EthereumDate,
                    datasets: [
                        {
                            data: EthereumPrice,
                            backgroundColor: '#fff',
                            borderColor: '#FFFF66',
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
            <div className='EthereumWrapper'>
                <h1 className='EthereumTitleText'>Ethereum</h1>
                <div className='LastEthereumPriceDate'>

                </div>

                <div className='InnerWrapperContent'>
                    <Line data={this.state.chartData} options={{
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

export default Ethereum;