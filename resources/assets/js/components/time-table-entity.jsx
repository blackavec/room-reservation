import React, { Component } from 'react';

export default class TimeTableEntity extends Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  capitalise(input) {
    if (!input) {
      return;
    }

    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  }

  isWeekend(day) {
    if (day ) {
      day = day.toLowerCase();
    }

    return (day === 'saturday' || day === 'sunday')
  }

  componentWillReceiveProps(props) {
    this.setState(props);
  }

  render() {
    return (
      <div className="time-table-entity">
        <div className="row-price-availibility">
          <div className={
              "day-name" +
              (this.isWeekend(this.state.dayName) ? " weekend" : '')
            }>
            {this.capitalise(this.state.dayName)}
          </div>
          <div className="day-number">
              {this.state.dayNumber}
          </div>
        </div>
        <div className="row-single-room"></div>
        <div className="row-room-available">
          <a href="javascript:void(0);">
            {this.state.singleRoomAvailable}
          </a>
        </div>
        <div className="row-price">
          <a href="javascript:void(0);">
            {this.state.singleRoomPrice}
          </a>
          <span>IDR</span>
        </div>
        <div className="row-double-room"></div>
        <div className="row-room-available">
          <a href="javascript:void(0);">
            {this.state.doubleRoomAvailable}
          </a>
        </div>
        <div className="row-price">
          <a href="javascript:void(0);">
            {this.state.doubleRoomPrice}
          </a>
          <span>IDR</span>
        </div>
      </div>
    );
  }
}
