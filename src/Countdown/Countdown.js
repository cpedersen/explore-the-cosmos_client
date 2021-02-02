import React, { Component } from 'react';
import './Countdown.css';

class Countdown extends Component {
  render() {
    return (
        <div class="container-countdown">
            <div class="countdown-box"> 
                Countdown: 
                <div class="timer-box">
                    3, 2, 1...
                </div>
            </div>
        </div>
    );
  }
}

export default Countdown;
