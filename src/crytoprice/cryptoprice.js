import React, {Component} from 'react';
import axios from 'axios';

class Crypto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cryptos: []
        }
    }

    componentDidMount() {
        axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,XRP&tsyms=USD').then(
            res => {
                const crypto = res.data;
                this.setState({
                    cryptos: crypto
                });
            }
        )
    }

    render() {

        return (
            <div id='crypto-price-wrapper'>
                {Object.keys(this.state.cryptos).map((key) => (
                    <div><b>{key} : </b><span><i>${this.state.cryptos[key].USD}</i></span></div>))
                }
            </div>
        )
    }
}

export default Crypto;

