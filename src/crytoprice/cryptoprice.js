import React, {Component} from 'react';
import './cryptoprice.css';
import Bitcoin from './bitcoinComponent/bitcoin';
import * as Scroll from 'react-scroll';


class Crypto extends Component {

    scrollToBitcoin() {
        Scroll.animateScroll.scrollTo(1400);
    }

    render() {
        return (
            <div>
                <div className='CryptoWrapper'>
                    <h1 className='TitleText'>Track Prices</h1>
                    <ul className='CryptoTitle'>
                        <li>
                            <a className='Bitcoin' onClick={this.scrollToBitcoin}>
                                <h3>Bitcoin</h3>
                            </a>
                        </li>
                        <li>
                            <a className='Ethereum'><h3>Ethereum</h3></a>
                        </li>

                        <li>
                            <a className='Litecoin'><h3>Litecoin</h3></a>
                        </li>
                    </ul>
                </div>
                <Bitcoin/>
            </div>

        )
    }
}

export default Crypto;

