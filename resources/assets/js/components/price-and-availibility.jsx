import React, { Component } from 'react';
import moment from 'moment';
import $ from 'jquery';
import TimeTableEntity from './time-table-entity.jsx';
import Waiting from './waiting.jsx';
import NotificationSystem from 'react-notification-system';

export default class PriceAndAvailibility extends Component {
  constructor(props) {
    super(props);

    const nowMoment = moment();

    this.state = {
      waiting: false,
      navigator: {
        currentYear: nowMoment.year(),
        currentMonth: nowMoment.month(),
      },
      viewTimetableRange: this.getMonthDateRange(),
      viewTimetableDatas: []
    };
  }

  showNotification(message, level) {
    this.refs.notificationSystem.addNotification({
      message: message,
      level: level,
      position: 'bl', // bottom center
    });
  }

  componentDidMount() {
    this.sendRequest();
  }

  componentWillUnmount() {
    if (this.request) {
      this.request.abort();
    }
  }

  scroll(direction) {
    const scrollSize = 300;
    const wrapper    = $('.time-table-wrapper');

    wrapper.stop().animate({
      scrollLeft: wrapper.scrollLeft() + (direction === 'left' ? -1 : 1) * scrollSize,
    }, 300);
  }

  getMonthDateRange() {
    let currentMoment = moment();

    if (this.state) {
      currentMoment.set({
        'year': this.state.navigator.currentYear,
        'month': this.state.navigator.currentMonth,
      });
    }

    const startDate = currentMoment.date(1);
    const endDate   = moment(startDate).endOf('month');

    return { start: startDate, end: endDate };
  }

  sendRequest() {
    const range = this.state.viewTimetableRange;

    this.setState({
      waiting: true,
    });

    this.request = $.getJSON('/timetable', {
      start: range['start'].format(),
      end: range['end'].format(),
    });

    this.request.done((items) => {
      const viewTimetableDatas = this.state.viewTimetableDatas;

      items.data.forEach((item) => {
        viewTimetableDatas[item.date] = {
          singleRoomAvailable: item.singleRoomAvailable,
          singleRoomPrice: item.singleRoomPrice,
          doubleRoomAvailable: item.doubleRoomAvailable,
          doubleRoomPrice: item.doubleRoomPrice,
        };
      });

      this.setState({
        viewTimetableDatas,
      });
    });

    this.request.fail(() => {
      this.showNotification('Request Failed, please try again', 'error');
    });

    this.request.always(() => {
      this.setState({
        waiting: false,
      });
    });
  }

  onFieldSuccessUpdate(date, oldValue, newValue) {
    this.sendRequest();

    this.showNotification(
      `Value of "${date.format('YYYY-DD-MM')}" has been updated from "${oldValue}" to "${newValue}".`,
      'success'
    );
  }

  onFieldFailedUpdate(date, oldValue, newValue) {
    this.showNotification(
      `Value of "${date.format('YYYY-DD-MM')}" has not been updated from "${oldValue}" to "${newValue}".` +
      ' Please Try Again.',
      'error'
    );
  }

  prepareTimetable () {
    let timetable = [];

    const dayOfMonth    = this.state.viewTimetableRange.start;
    const timetableDates = this.state.viewTimetableDatas;

    for (let day = 1 ; day <= parseInt(this.state.viewTimetableRange.end.format('DD')) ; day++) {
      const timetableDate = moment(dayOfMonth).add(day - 1, 'day');

      let singleRoomAvailable = 0;
      let singleRoomPrice = 0;
      let doubleRoomAvailable = 0;
      let doubleRoomPrice = 0;

      if (timetableDates.hasOwnProperty(timetableDate.format('YYYY-DD-MM'))) {
        const timetableDateObject = timetableDates[timetableDate.format('YYYY-DD-MM')];

        singleRoomAvailable = timetableDateObject.singleRoomAvailable;
        singleRoomPrice = timetableDateObject.singleRoomPrice;
        doubleRoomAvailable = timetableDateObject.doubleRoomAvailable;
        doubleRoomPrice = timetableDateObject.doubleRoomPrice;
      }

      timetable.push({
        date: timetableDate,
        dayName: timetableDate.format('dddd'),
        dayNumber: timetableDate.format('D'),
        singleRoomAvailable: singleRoomAvailable,
        singleRoomPrice: singleRoomPrice,
        doubleRoomAvailable: doubleRoomAvailable,
        doubleRoomPrice: doubleRoomPrice,
      });
    }

    return timetable;
  }

  render() {
    const timetable = this.prepareTimetable();

    return (
      <div className="form-inline form-price-and-availibility">
        <button className="hidden price-and-availibility-refresh" onClick={this.sendRequest.bind(this)} />
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
            <span
              className="date-picker-month-navigator
              glyphicon glyphicon-triangle-left"
              onClick={() => {
                this.state.navigator.currentYear--;
                this.state.viewTimetableRange = this.getMonthDateRange();

                this.setState([
                  this.state.navigator,
                  this.state.viewTimetableRange,
                ]);

                this.sendRequest();
              }}>
            </span>
            <div className="date-picker-month-navigator-dropdown">
              <select
                onChange={(e) => {
                  this.state.navigator.currentMonth = e.target.value;
                  this.state.viewTimetableRange      = this.getMonthDateRange();

                  this.setState([
                    this.state.navigator,
                    this.state.viewTimetableRange,
                  ]);

                  this.sendRequest();
                }}
                value={this.state.navigator.currentMonth}>
                selected={this.state.navigator.currentMonth}>
                {
                  [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ].map((monthName, i) => {
                    return (<option key={i} value={i}>{monthName}</option>);
                  })
                }
              </select>
              <span className="date-picker-month-navigator
                glyphicon glyphicon-triangle-bottom"></span>
            </div>
            <span>{this.state.navigator.currentYear}</span>
            <span
              className="date-picker-month-navigator
              glyphicon glyphicon-triangle-right"
              onClick={() => {
                this.state.navigator.currentYear++;
                this.state.viewTimetableRange = this.getMonthDateRange();

                this.setState([
                  this.state.navigator,
                  this.state.viewTimetableRange,
                ]);

                this.sendRequest();
              }}></span>
          </div>
          <div className="scroll scroll-left">
            <span
              className="date-picker-month-navigator
              glyphicon glyphicon-triangle-left"
              onClick={this.scroll.bind(this, 'left')}>
            </span>
          </div>
          <div className="scroll scroll-right">
            <span
              className="date-picker-month-navigator
              glyphicon glyphicon-triangle-right"
              onClick={this.scroll.bind(this, 'right')}>
            </span>
          </div>
          <div className="time-table-wrapper">
            <div className="time-table">
              {
                timetable.map((obj, i) => {
                  return (
                    <TimeTableEntity
                      key={i}
                      date={obj.date}
                      dayName={obj.dayName}
                      dayNumber={obj.dayNumber}
                      singleRoomAvailable={obj.singleRoomAvailable}
                      singleRoomPrice={obj.singleRoomPrice}
                      doubleRoomAvailable={obj.doubleRoomAvailable}
                      doubleRoomPrice={obj.doubleRoomPrice}
                      onSuccessUpdate={this.onFieldSuccessUpdate.bind(this)}
                      onFailedUpdate={this.onFieldFailedUpdate.bind(this)}
                      />
                  );
                })
              }
            </div>
          </div>
        </div>
        <div className="clearfix"></div>
        <Waiting show={this.state.waiting} />
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}
