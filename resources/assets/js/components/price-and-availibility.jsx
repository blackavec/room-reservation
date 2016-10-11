import React, { Component } from 'react';
import TimeTableEntity from './time-table-entity.jsx'

export default class PriceAndAvailibility extends Component {
  render() {
    return (
      <form className="form-inline form-price-and-availibility">
        <div className="left-panel">
          <div className="row-price-availibility">
            <span>Price and Availability</span>
          </div>
          <div className="row-single-room">
            <span>Single Room</span>
          </div>
          <div className="row-room-available">
            <span>Room Available</span>
          </div>
          <div className="row-price">
            <span>Price</span>
          </div>
          <div className="row-double-room">
            <span>Double Room</span>
          </div>
          <div className="row-room-available">
            <span>Room Available</span>
          </div>
          <div className="row-price">
            <span>Price</span>
          </div>
        </div>
        <div className="right-panel">
          <div className="top-date-picker">
            <span className="date-picker-month-navigator
              glyphicon glyphicon-triangle-left">
            </span>
            <div className="date-picker-month-navigator-dropdown">
              <select>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              <span className="date-picker-month-navigator
                glyphicon glyphicon-triangle-bottom"></span>
            </div>
            <span>2016</span>
            <span className="date-picker-month-navigator
              glyphicon glyphicon-triangle-right"></span>
          </div>
          <div className="time-table-wrapper">
            <div className="time-table">
              <TimeTableEntity
                dayName="Sunday"
                dayNumber={0}
                singleRoomAvailable={0}
                singleRoomPrice={0}
                doubleRoomAvailable={0}
                doubleRoomPrice={0}
                />
            </div>
          </div>
        </div>
        <div className="clearfix"></div>
      </form>
    );
  }
}
