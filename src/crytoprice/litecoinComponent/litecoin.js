import React, {Component} from 'react';
import axios from 'axios';
import './litecoin.css';
import {Line} from 'react-chartjs-2';

let LitecoinPrice = [];
let LitecoinDate = [];
let LitObjectData = [];

class Litecoin extends Component {

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
            LastUpdatedLitecoinPrice: '',
            LastUpdatedLitecoinChange: '',
        }
    }

    getLastLitecoinPricedData(LitecoinPriceArr) {
        let LitecoinPriceChange = '';
        let LitecoinPercentChange = '';
        let lastPrice = LitecoinPriceArr[LitecoinPriceArr.length - 1];
        let seconLastPrice = LitecoinPriceArr[LitecoinPriceArr.length - 2];
        let diff = lastPrice - seconLastPrice;
        diff = Math.round(diff * 100) / 100;
        let percent = (diff / seconLastPrice) * 100;
        percent = Math.round(percent * 100) / 100;
        if (diff > 0) {
            LitecoinPriceChange = '+$' + diff;
            LitecoinPercentChange = percent + '%';
        }
        else {
            LitecoinPriceChange = '-$' + diff;
            LitecoinPercentChange = '-' + percent + '%';
        }
        this.setState({
            LastUpdatedLitecoinPrice: LitecoinPriceChange,
            LastUpdatedLitecoinChange: LitecoinPercentChange
        })
    }

    componentDidMount() {
        axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=LTC&tsym=USD&limit=30&aggregate=1').then(
            res => {
                const crypto = res.data['Data'];
                Object.entries(crypto).map((res) => {
                    LitObjectData.push(res[1]);
                });
                Object.entries(LitObjectData).map((result) => {
                    LitecoinPrice.push(result[1].open);
                    let DateObj = new Date(result[1].time * 1000);
                    let monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ];
                    let day = DateObj.getDate();
                    let month = DateObj.getMonth();
                    let year = DateObj.getFullYear();
                    let newDate = day + " " + monthNames[month] + ", " + year;
                    LitecoinDate.push(newDate.toString());
                });
                this.getLastLitecoinPricedData(LitecoinPrice);
                const charData = {
                    labels: LitecoinDate,
                    datasets: [
                        {
                            data: LitecoinPrice,
                            backgroundColor: '#fff',
                            borderColor: '#FF3399',
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
            <div className='LitecoinWrapper'>
                <h1 className='LitecoinTitleText'>Litecoin</h1>
                <div className='LastLitecoinPriceDate'>
                    <h4>{this.state.LastUpdatedLitecoinPrice} ({this.state.LastUpdatedLitecoinChange}) PAST 24
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

export default Litecoin;