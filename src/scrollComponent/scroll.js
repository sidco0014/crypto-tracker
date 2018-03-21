import React, {Component} from 'react';
import './scroll.css';
import * as Scroll from 'react-scroll';

class ScrollDown extends Component {

    scrollTo() {
        Scroll.animateScroll.scrollTo(600);
    }

    render() {
        return (
            <div>
                <a onClick={this.scrollTo} className='ScrollDown'>Scroll Down</a>
            </div>
        )
    }
}

export default ScrollDown;