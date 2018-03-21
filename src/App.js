import React, {Component} from 'react';
import './App.css';
import Crypto from './crytoprice/cryptoprice';
import Particles from 'react-particles-js';
import ScrollDown from './scrollComponent/scroll';

class App extends Component {

    render() {
        return (
            <div className="App">
                <div>
                    <p className="HeaderTitle">CryptoWorld</p>
                    <ScrollDown/>
                    <Particles
                        params={
                            {
                                particles: {
                                    number: {
                                        value: 60,
                                        density: {
                                            enable: true,
                                            value_area: 800
                                        }
                                    },
                                    color: {
                                        value: "#ffffff"
                                    },
                                    shape: {
                                        type: "circle",
                                        stroke: {
                                            width: 1,
                                            color: "#000000"
                                        },
                                        polygon: {
                                            nb_sides: 5
                                        },
                                    },
                                    opacity: {
                                        value: 0.5,
                                        random: false,
                                        anim: {
                                            enable: false,
                                            speed: 1,
                                            opacity_min: 0.1,
                                            sync: false
                                        }
                                    },
                                    size: {
                                        value: 5,
                                        random: true,
                                        anim: {
                                            enable: false,
                                            speed: 80,
                                            size_min: 0.1,
                                            sync: false
                                        }
                                    },
                                    line_linked: {
                                        enable: true,
                                        distance: 100,
                                        color: "#ffffff",
                                        opacity: 0.6,
                                        width: 1
                                    },
                                    move: {
                                        enable: true,
                                        speed: 5,
                                        direction: "none",
                                        random: false,
                                        straight: false,
                                        out_mode: "out",
                                        bounce: true,
                                        attract: {
                                            enable: false,
                                            rotateX: 600,
                                            rotateY: 1200
                                        }
                                    }
                                },
                                interactivity: {
                                    detect_on: "canvas",
                                    events: {
                                        onhover: {
                                            enable: true,
                                            mode: "repulse"
                                        },
                                        onclick: {
                                            enable: true,
                                            mode: "push"
                                        },
                                        resize: true
                                    },
                                    modes: {
                                        grab: {
                                            distance: 200,
                                            line_linked: {
                                                opacity: 1
                                            }
                                        },
                                        bubble: {
                                            distance: 200,
                                            size: 20,
                                            duration: 2,
                                            opacity: 0.8,
                                            speed: 100
                                        },
                                        repulse: {
                                            distance: 100,
                                            duration: 0.4
                                        },
                                        push: {
                                            particles_nb: 4
                                        },
                                        remove: {
                                            particles_nb: 2
                                        }
                                    }
                                },
                                retina_detect: true
                            }}
                        style={{
                            width: '100%',
                            backgroundColor: '#030e21',
                            zIndex: 9999
                        }}/>
                </div>
                <Crypto/>
            </div>
        );
    }
}

export default App;
