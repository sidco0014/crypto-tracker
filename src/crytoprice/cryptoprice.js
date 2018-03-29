import React, {Component} from 'react';
import './cryptoprice.css';
import Bitcoin from './bitcoinComponent/bitcoin';
import Ethereum from './EthereumComponent/Ethereum';
import Litecoin from './litecoinComponent/litecoin';
import * as Scroll from 'react-scroll';


class Crypto extends Component {

    scrollToBitcoin() {
        Scroll.animateScroll.scrollTo(2000);
    }

    scrollToEthereum() {
        Scroll.animateScroll.scrollTo(3000);
    }

    scrollToLitecoin() {
        Scroll.animateScroll.scrollTo(4200);
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
                            <a className='Ethereum' onClick={this.scrollToEthereum}><h3>Ethereum</h3></a>
                        </li>

                        <li>
                            <a className='Litecoin' onClick={this.scrollToLitecoin}><h3>Litecoin</h3></a>
                        </li>
                    </ul>
                </div>
                <Bitcoin/>
                <Ethereum/>
                <Litecoin/>
            </div>

        )
    }
}

export default Crypto;

