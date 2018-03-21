import React, {Component} from 'react';
// import axios from 'axios';
import './cryptoprice.css';

class Crypto extends Component {
    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         cryptos: []
    //     }
    // }

    componentDidMount() {
        // axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,XRP&tsyms=USD').then(
        //     res => {
        //         const crypto = res.data;
        //         this.setState({
        //             cryptos: crypto
        //         });
        //     }
        // )
    }

    render() {

        return (
            <div className='CryptoWrapper'>
                <h1 className='TitleText'>TrackPrices</h1>
                <ul className='CryptoTitle'>
                    <li>
                        <a className='Bitcoin'><h3>Bitcoin</h3></a>
                    </li>
                    <li>
                        <a className='Ethereum'><h3>Ethereum</h3></a>
                    </li>
                    <li>
                        <a className='Litecoin'><h3>Litecoin</h3></a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Crypto;

