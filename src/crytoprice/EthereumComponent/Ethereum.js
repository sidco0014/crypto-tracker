import React, {Component} from 'react';
import axios from 'axios';
import './Ethereum.css';
import {Line} from 'react-chartjs-2';

let EthereumPrice = [];
let EthereumDate = [];
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
            LastUpdatedEthereumChange: '',
        }
    }

    getLastEthereumPricedData(EthereumPrice) {
        let EthereumPriceChange = '';
        let EthereumPercentChange = '';
        let lastPrice = EthereumPrice[EthereumPrice.length - 1];
        let seconLastPrice = EthereumPrice[EthereumPrice.length - 2];
        let diff = lastPrice - seconLastPrice;
        diff = Math.round(diff * 100) / 100;
        let percent = (diff / seconLastPrice) * 100;
        percent = Math.round(percent * 100) / 100;
        if (diff > 0) {
            EthereumPriceChange = '+$' + diff;
            EthereumPercentChange = percent + '%';
        }
        else {
            EthereumPriceChange = '-$' + diff;
            EthereumPercentChange = '-' + percent + '%';
        }
        this.setState({
            LastUpdatedEthereumPrice: EthereumPriceChange,
            LastUpdatedEthereumChange: EthereumPercentChange
        })
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
                this.getLastEthereumPricedData(EthereumPrice);
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
                    <h4>{this.state.LastUpdatedEthereumPrice} ({this.state.LastUpdatedEthereumChange}) PAST 24
                        HOURS</h4>
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