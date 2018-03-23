import React, {Component} from 'react';
import axios from 'axios';
import './litecoin.css';
import {Line} from 'react-chartjs-2';

let LitecoinPrice = [];
let LitecoinDate = [];
let lastPrice;
let lastUpdatedOn;
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
            lastUpdatedLitecoinDate: '',
        }
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