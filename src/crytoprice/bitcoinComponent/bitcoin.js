import React, {Component} from 'react';
import axios from 'axios';
import './bitcoin.css';


class Bitcoin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cryptos: []
        }
    }


    componentDidMount() {
        axios.get('https://min-api.cryptocompare.com/data/generateAvg?fsym=BTC&tsym=USD&e=Kraken').then(
            res => {
                const crypto = res.data['RAW'];
                this.setState({cryptos: crypto});
            })
    }

    render() {
        return (
            <div className='BitcoinWrapper' id='myScrollToElement'>
                <h1 className='BitcoinTitleText'>Bitcoin</h1>
                <p>{this.state.cryptos.PRICE}</p>
                <p>{this.state.cryptos.FROMSYMBOL}</p>
                <p>{this.state.cryptos.HIGH24HOUR}</p>
                <p>{this.state.cryptos.LOW24HOUR}</p>
                <p>{this.state.cryptos.OPEN24HOUR}</p>
            </div>
        )
    }

}

export default Bitcoin;