import React, {Component} from 'react';
import axios from 'axios';
import './bitcoin.css';
import "react-bootstrap/dist/react-bootstrap.min.js";
import {Line} from 'react-chartjs-2';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

let BitcoinPrice = [];
let BitcoinDate = [];
let BitcoinData = [];
let BitcoinDayPrice = [];
let BitcoinDayDate = [];
let BitcoinDayData = [];

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
            chartDayData: {
                labels: [],
                datasets: [
                    {
                        data: [],
                    }
                ],
            },
            LastUpdatedBitcoinPrice: '',
            LastUpdatedBitcoinChange: '',
            LastUpdatedBitcoinDayPrice: '',
            LastUpdatedBitcoinDayChange: '',
        }
    }

    calculatePriceDiff = (BitcoinPriceArr, counter) => {
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
            BitcoinPriceChange = '-$' + (-1 * diff);
            BitcoinPercentChange = percent + '%';
        }
        if (counter === 1) {
            this.getLastBitcoinDayPriceData(BitcoinPriceChange, BitcoinPercentChange)
        }
        else {
            this.getLastBitcoinMonthPriceData(BitcoinPriceChange, BitcoinPercentChange);
        }
    };

    getLastBitcoinMonthPriceData = (BitcoinPriceChange, BitcoinPercentChange) => {
        this.setState({
            LastUpdatedBitcoinPrice: BitcoinPriceChange,
            LastUpdatedBitcoinChange: BitcoinPercentChange
        })
    };

    getLastBitcoinDayPriceData = (BitcoinPriceChange, BitcoinPercentChange) => {
        this.setState({
            LastUpdatedBitcoinDayPrice: BitcoinPriceChange,
            LastUpdatedBitcoinDayChange: BitcoinPercentChange
        })
    };

    calculateMonthDateFormat = (DateObj) => {
        let monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let day = DateObj.getDate();
        let month = DateObj.getMonth();
        let year = DateObj.getFullYear();
        let newDate = day + " " + monthNames[month] + ", " + year;
        BitcoinDate.push(newDate.toString());
    };

    calculateDayTimeFormat = (DateObj) => {
        let hours = DateObj.getHours();
        if (hours === 0) {
            hours = '00';
        }
        let mins = DateObj.getMinutes() + '0';
        let time = hours + ":" + mins;
        BitcoinDayDate.push(time.toString());
    };

    generateMonthChart = (BitcoinData, BitcoinPrice) => {
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
        this.setState({
            chartData: charData
        })
    };

    componentDidMount() {
        //1 month data
        axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=30&aggregate=1').then(
            res => {
                const crypto = res.data['Data'];
                Object.entries(crypto).map((res) => {
                    BitcoinData.push(res[1]);
                });
                this.setState({cryptos: crypto});
                Object.entries(BitcoinData).map((result) => {
                    BitcoinPrice.push(result[1].open);
                    let DateObj = new Date(result[1].time * 1000);
                    this.calculateMonthDateFormat(DateObj);
                });
                this.calculatePriceDiff(BitcoinPrice);
                this.generateMonthChart(BitcoinData, BitcoinPrice);
            });

        //24 hours data
        axios.get('https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=USD&limit=24&aggregate=1&e=CCCAGG').then(
            res => {
                let counter = 0;
                counter++;
                const crypto = res.data['Data'];
                Object.entries(crypto).map((res) => {
                    BitcoinDayData.push(res[1]);
                });
                this.setState({cryptos: crypto});
                Object.entries(BitcoinDayData).map((result) => {
                    BitcoinDayPrice.push(result[1].open);
                    let DateObj = new Date(result[1].time * 1000);
                    this.calculateDayTimeFormat(DateObj);
                });
                this.calculatePriceDiff(BitcoinDayPrice, counter);
                const charData = {
                    labels: BitcoinDayDate,
                    datasets: [
                        {
                            data: BitcoinDayPrice,
                            showLine: true,
                            backgroundColor: '#fff',
                            borderColor: '#00ea9c',
                            fill: false,
                            lineTension: 0,
                            pointRadius: 3,
                        }
                    ],
                };
                this.setState({
                    chartDayData: charData
                })
            });
    }

    render() {
        return (
            <div className='BitcoinWrapper'>
                <h1 className='BitcoinTitleText'>Bitcoin</h1>
                <Tabs>
                    <TabPanel>
                        <div className='LastBitcoinPriceDate'>
                            <h4>{this.state.LastUpdatedBitcoinDayPrice} ({this.state.LastUpdatedBitcoinDayChange}) 24
                                HOURS</h4>
                            <div className='InnerBitcoinWrapperContent'>
                                <Line data={this.state.chartDayData} options={{
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
                    </TabPanel>

                    <TabPanel>
                        <div className='LastBitcoinPriceDate'>
                            <h4>{this.state.LastUpdatedBitcoinPrice} ({this.state.LastUpdatedBitcoinChange}) PAST
                                MONTH</h4>
                            <div className='InnerBitcoinWrapperContent'>
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
                    </TabPanel>
                    <TabList className='displayTabs'>
                        <Tab className='DayTab'>24H</Tab>
                        <Tab className='MonthTab'>1M</Tab>
                    </TabList>
                </Tabs>
            </div>
        )
    }
}

export default Bitcoin;