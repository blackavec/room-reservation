import React, { Component } from 'react';
import moment from 'moment';
import $ from 'jquery';
import TimeTableEntity from './time-table-entity.jsx';
import Waiting from './waiting.jsx';

export default class PriceAndAvailibility extends Component {
  constructor(props) {
    super(props);

    const nowMoment = moment();

    this.state = {
      navigator: {
        currentYear: nowMoment.year(),
        currentMonth: nowMoment.month(),
      },
      viewTimelineRange: this.getMonthDateRange(),
      viewTimelineDatas: []
    };

    this.sendRequest();
  }


  scroll(direction) {
    const scrollSize = 300;
    const wrapper    = $('.time-table-wrapper');

    if (direction === 'left') {
      wrapper.stop().animate({
        scrollLeft: wrapper.scrollLeft() - scrollSize,
      }, 300);

      return;
    }

    wrapper.stop().animate({
      scrollLeft: wrapper.scrollLeft() + scrollSize,
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

  requestResponse(res) {
    console.error(res);
  }

  sendRequest() {
    this.state.waiting = true;
    const range        = this.state.viewTimelineRange;

    this.request = $.getJSON('/timeline', {
      start: this.state.viewTimelineRange['start'].format(),
      end: this.state.viewTimelineRange['end'].format(),
    });
    this.request.then((res) => {
      console.log('fulfil', res);
    }, (reject) => {
      console.log('rejected', reject);
    });
  }

  prepareTimeline () {
    let timeline = [];

    let reachedEnd   = false;

    const dayOfMonth   = this.state.viewTimelineRange.start;
    const timelineDates = this.state.viewTimelineDatas;

    while (!reachedEnd) {
      const timelineDate = dayOfMonth.format('YYYY-DD-MM');

      let singleRoomAvailable = 0;
      let singleRoomPrice = 0;
      let doubleRoomAvailable = 0;
      let doubleRoomPrice = 0;

      if (timelineDates.hasOwnProperty(timelineDate)) {
        const timelineDateObject = timelineDates[timelineDate];

        singleRoomAvailable = timelineDateObject.singleRoomAvailable;
        singleRoomPrice = timelineDateObject.singleRoomPrice;
        doubleRoomAvailable = timelineDateObject.doubleRoomAvailable;
        doubleRoomPrice = timelineDateObject.doubleRoomPrice;
      }

      timeline.push({
        dayName: dayOfMonth.format('dddd'),
        dayNumber: dayOfMonth.format('D'),
        singleRoomAvailable: singleRoomAvailable,
        singleRoomPrice: singleRoomPrice,
        doubleRoomAvailable: doubleRoomAvailable,
        doubleRoomPrice: doubleRoomPrice,
      });

      if (dayOfMonth.format('YYYY-DD-MM') === this.state.viewTimelineRange.end.format('YYYY-DD-MM')) {
        reachedEnd = true;
      }

      dayOfMonth.add(1, 'day');
    }

    return timeline;
  }

  render() {
    const timeline = this.prepareTimeline();

    return (
      <div className="form-inline form-price-and-availibility">
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
                this.state.viewTimelineRange = this.getMonthDateRange();

                this.setState([
                  this.state.navigator,
                  this.state.viewTimelineRange,
                ]);
              }}>
            </span>
            <div className="date-picker-month-navigator-dropdown">
              <select
                onChange={(e) => {
                  this.state.navigator.currentMonth = e.target.value;
                  this.state.viewTimelineRange      = this.getMonthDateRange();

                  this.setState([
                    this.state.navigator,
                    this.state.viewTimelineRange,
                  ]);
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
                this.state.viewTimelineRange = this.getMonthDateRange();

                this.setState([
                  this.state.navigator,
                  this.state.viewTimelineRange,
                ]);
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
                timeline.map((obj, i) => {
                  return (
                    <TimeTableEntity
                      key={i}
                      dayName={obj.dayName}
                      dayNumber={obj.dayNumber}
                      singleRoomAvailable={obj.singleRoomAvailable}
                      singleRoomPrice={obj.singleRoomPrice}
                      doubleRoomAvailable={obj.doubleRoomAvailable}
                      doubleRoomPrice={obj.doubleRoomPrice}
                      />
                  );
                })
              }
            </div>
          </div>
        </div>
        <div className="clearfix"></div>
        <Waiting show={this.state.waiting} />
      </div>
    );
  }
}
