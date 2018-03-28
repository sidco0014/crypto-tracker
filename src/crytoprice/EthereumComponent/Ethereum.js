import React, {Component} from 'react';
import axios from 'axios';
import './Ethereum.css';
import {Line} from 'react-chartjs-2';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

let EthereumPrice = [];
let EthereumDate = [];
let EthereumDayPrice = [];
let EthereumDayData = [];
let EthereumData = [];
let EthereumDayDate = [];


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
            chartDayData: {
                labels: [],
                datasets: [
                    {
                        data: [],
                    }
                ],
            },
            LastUpdatedEthereumPrice: '',
            LastUpdatedEthereumChange: '',
            LastUpdatedEthereumDayPrice: '',
            LastUpdatedEthereumDayChange: '',
        }
    }

    calculatePriceDiff = (EthereumPriceArr, counter) => {
        let EthereumPriceChange = '';
        let EthereumPercentChange = '';
        let lastPrice = EthereumPriceArr[EthereumPriceArr.length - 1];
        let firstPrice = EthereumPriceArr[0];
        let diff = lastPrice - firstPrice;
        diff = Math.round(diff * 100) / 100;
        let percent = (diff / firstPrice) * 100;
        percent = Math.round(percent * 100) / 100;
        if (diff > 0) {
            EthereumPriceChange = '+$' + diff;
            EthereumPercentChange = percent + '%';
        }
        else {
            EthereumPriceChange = '-$' + (-1 * diff);
            EthereumPercentChange = percent + '%';
        }
        if (counter === 1) {
            this.getLastEthereumDayPriceData(EthereumPriceChange, EthereumPercentChange)
        }
        else {
            this.getLastEthereumMonthPriceData(EthereumPriceChange, EthereumPercentChange);
        }
    };

    getLastEthereumMonthPriceData = (EthereumPriceChange, EthereumPercentChange) => {
        this.setState({
            LastUpdatedEthereumPrice: EthereumPriceChange,
            LastUpdatedEthereumChange: EthereumPercentChange
        })
    };

    getLastEthereumDayPriceData = (EthereumPriceChange, EthereumPercentChange) => {
        this.setState({
            LastUpdatedEthereumDayPrice: EthereumPriceChange,
            LastUpdatedEthereumDayChange: EthereumPercentChange
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
        EthereumDate.push(newDate.toString());
    };

    calculateDayTimeFormat = (DateObj) => {
        let hours = DateObj.getHours();
        if (hours === 0) {
            hours = '00';
        }
        let mins = DateObj.getMinutes() + '0';
        let time = hours + ":" + mins;
        EthereumDayDate.push(time.toString());
    };

    generateMonthChart = (EthereumData, EthereumPrice) => {
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
        this.setState({
            chartData: charData
        })
    };

    componentDidMount() {
        //1 month data
        axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=30&aggregate=1').then(
            res => {
                const crypto = res.data['Data'];
                Object.entries(crypto).map((res) => {
                    EthereumData.push(res[1]);
                });
                this.setState({cryptos: crypto});
                Object.entries(EthereumData).map((result) => {
                    EthereumPrice.push(result[1].open);
                    let DateObj = new Date(result[1].time * 1000);
                    this.calculateMonthDateFormat(DateObj);
                });
                this.calculatePriceDiff(EthereumPrice);
                this.generateMonthChart(EthereumData, EthereumPrice);
            });

        //24 hours data
        axios.get('https://min-api.cryptocompare.com/data/histohour?fsym=ETH&tsym=USD&limit=24&aggregate=1&e=CCCAGG').then(
            res => {
                let counter = 0;
                counter++;
                const crypto = res.data['Data'];
                Object.entries(crypto).map((res) => {
                    EthereumDayData.push(res[1]);
                });
                this.setState({cryptos: crypto});
                Object.entries(EthereumDayData).map((result) => {
                    EthereumDayPrice.push(result[1].open);
                    let DateObj = new Date(result[1].time * 1000);
                    this.calculateDayTimeFormat(DateObj);
                });
                this.calculatePriceDiff(EthereumDayPrice, counter);
                const charData = {
                    labels: EthereumDayDate,
                    datasets: [
                        {
                            data: EthereumDayPrice,
                            showLine: true,
                            backgroundColor: '#fff',
                            borderColor: '#FFFF66',
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
            <div className='EthereumWrapper'>
                <h1 className='EthereumTitleText'>Ethereum</h1>
                <Tabs>
                    <TabPanel>
                        <div className='LastEthereumPriceDate'>
                            <h4>{this.state.LastUpdatedEthereumDayPrice} ({this.state.LastUpdatedEthereumDayChange}) 24
                                HOURS</h4>
                            <div className='InnerEthereumWrapperContent'>
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
                        <div className='LastEthereumPriceDate'>
                            <h4>{this.state.LastUpdatedEthereumPrice} ({this.state.LastUpdatedEthereumChange}) PAST
                                MONTH</h4>
                            <div className='InnerEthereumWrapperContent'>
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

export default Ethereum;