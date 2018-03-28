import React, {Component} from 'react';
import axios from 'axios';
import './litecoin.css';
import "react-bootstrap/dist/react-bootstrap.min.js";
import {Line} from 'react-chartjs-2';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

let LitecoinPrice = [];
let LitecoinDate = [];
let LitecoinData = [];
let LitecoinDayPrice = [];
let LitecoinDayDate = [];
let LitecoinDayData = [];

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
            chartDayData: {
                labels: [],
                datasets: [
                    {
                        data: [],
                    }
                ],
            },
            LastUpdatedLitecoinPrice: '',
            LastUpdatedLitecoinChange: '',
            LastUpdatedLitecoinDayPrice: '',
            LastUpdatedLitecoinDayChange: '',
        }
    }

    calculatePriceDiff = (LitecoinPriceArr, counter) => {
        let LitecoinPriceChange = '';
        let LitecoinPercentChange = '';
        let lastPrice = LitecoinPriceArr[LitecoinPriceArr.length - 1];
        let firstPrice = LitecoinPriceArr[0];
        let diff = lastPrice - firstPrice;
        diff = Math.round(diff * 100) / 100;
        let percent = (diff / firstPrice) * 100;
        percent = Math.round(percent * 100) / 100;
        if (diff > 0) {
            LitecoinPriceChange = '+$' + diff;
            LitecoinPercentChange = percent + '%';
        }
        else {
            LitecoinPriceChange = '-$' + (-1 * diff);
            LitecoinPercentChange = percent + '%';
        }
        if (counter === 1) {
            this.getLastLitecoinDayPriceData(LitecoinPriceChange, LitecoinPercentChange)
        }
        else {
            this.getLastLitecoinMonthPriceData(LitecoinPriceChange, LitecoinPercentChange);
        }
    };

    getLastLitecoinMonthPriceData = (LitecoinPriceChange, LitecoinPercentChange) => {
        this.setState({
            LastUpdatedLitecoinPrice: LitecoinPriceChange,
            LastUpdatedLitecoinChange: LitecoinPercentChange
        })
    };

    getLastLitecoinDayPriceData = (LitecoinPriceChange, LitecoinPercentChange) => {
        this.setState({
            LastUpdatedLitecoinDayPrice: LitecoinPriceChange,
            LastUpdatedLitecoinDayChange: LitecoinPercentChange
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
        LitecoinDate.push(newDate.toString());
    };

    calculateDayTimeFormat = (DateObj) => {
        let hours = DateObj.getHours();
        if (hours === 0) {
            hours = '00';
        }
        let mins = DateObj.getMinutes() + '0';
        let time = hours + ":" + mins;
        LitecoinDayDate.push(time.toString());
    };

    generateMonthChart = (LitecoinData, LitecoinPrice) => {
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
        this.setState({
            chartData: charData
        })
    };

    componentDidMount() {
        //1 month data
        axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=LTC&tsym=USD&limit=30&aggregate=1').then(
            res => {
                const crypto = res.data['Data'];
                Object.entries(crypto).map((res) => {
                    LitecoinData.push(res[1]);
                });
                this.setState({cryptos: crypto});
                Object.entries(LitecoinData).map((result) => {
                    LitecoinPrice.push(result[1].open);
                    let DateObj = new Date(result[1].time * 1000);
                    this.calculateMonthDateFormat(DateObj);
                });
                this.calculatePriceDiff(LitecoinPrice);
                this.generateMonthChart(LitecoinData, LitecoinPrice);
            });

        //24 hours data
        axios.get('https://min-api.cryptocompare.com/data/histohour?fsym=LTC&tsym=USD&limit=24&aggregate=1&e=CCCAGG').then(
            res => {
                let counter = 0;
                counter++;
                const crypto = res.data['Data'];
                Object.entries(crypto).map((res) => {
                    LitecoinDayData.push(res[1]);
                });
                this.setState({cryptos: crypto});
                Object.entries(LitecoinDayData).map((result) => {
                    LitecoinDayPrice.push(result[1].open);
                    let DateObj = new Date(result[1].time * 1000);
                    this.calculateDayTimeFormat(DateObj);
                });
                this.calculatePriceDiff(LitecoinDayPrice, counter);
                const charData = {
                    labels: LitecoinDayDate,
                    datasets: [
                        {
                            data: LitecoinDayPrice,
                            showLine: true,
                            backgroundColor: '#fff',
                            borderColor: '#FF3399',
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
            <div className='LitecoinWrapper'>
                <h1 className='LitecoinTitleText'>Litecoin</h1>
                <Tabs>
                    <TabPanel>
                        <div className='LastLitecoinPriceDate'>
                            <h4>{this.state.LastUpdatedLitecoinDayPrice} ({this.state.LastUpdatedLitecoinDayChange}) 24
                                HOURS</h4>
                            <div className='InnerLitecoinWrapperContent'>
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
                        <div className='LastLitecoinPriceDate'>
                            <h4>{this.state.LastUpdatedLitecoinPrice} ({this.state.LastUpdatedLitecoinChange}) PAST
                                MONTH</h4>
                            <div className='InnerLitecoinWrapperContent'>
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

export default Litecoin;