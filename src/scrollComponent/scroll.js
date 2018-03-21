import * as Scroll from 'react-scroll';
import React, {Component} from 'react';
import './scroll.css';

// Or Access Link,Element,etc as follows
let scroll = Scroll.animateScroll;

class ScrollDown extends Component {

    scrollToBottom() {
        scroll.scrollToBottom();
    }

    render() {
        return (
            <div>
                <a onClick={this.scrollToBottom} className='ScrollDown'>Scroll Down</a>
            </div>
        )
    }

}

export default ScrollDown;