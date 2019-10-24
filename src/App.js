import React, { Component } from 'react';
import './App.css';

import moment from 'moment';
require('moment-precise-range-plugin');

class App extends Component {

  constructor() {
    super();
    this.startDate = moment('2011-06-11 18:00:00', 'YYYY-MM-DD HH:mm:ss');

    let now = moment();
    this.state = moment.preciseDiff(this.startDate, now, true);
  }

  componentDidMount() {
    let heart = document.getElementById("heart");
    heart.classList.add("pulsing-heart");
    this.timer = setInterval(() => {
      let now = moment();
      this.setState(moment.preciseDiff(this.startDate, now, true));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  renderNumber(number, legend) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', margin: "2vw" }}>
        <div style={{ fontSize: '10vw', marginRight: '0.1vw'}}>{number}</div>
        <div style={{ fontSize: '1.2vw', writingMode: 'vertical-rl', textOrientation: 'upright'}}>{legend}</div>
      </div>
    )
  }

  renderDigits(number) {
    let digit1 = Math.trunc(number / 10);
    let digit2 = ("" + number).slice(-1);
    return (
      <div style={{ display: 'flex', flexDirection: 'row', margin: "1vw", width: "7vw" }}>
        <div style={{ minWidth: '3.5vw' }}>{digit1}</div>
        <div style={{ minWidth: '3.5vw' }}>{digit2}</div>
      </div>
    )
  }

  render() {
    const { years, months, days, hours, minutes, seconds } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            {this.renderNumber(years, "ans")}
            {this.renderNumber(months, "mois")}
            {this.renderNumber(days, days > 1 ? "jours" : "jour")}
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: '5vw'}}>
            {this.renderDigits(hours)} :
            {this.renderDigits(minutes)} :
            {this.renderDigits(seconds)}
          </div>
          <div style={{width: 120, height: 120}}>
            <div id="heart"></div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
