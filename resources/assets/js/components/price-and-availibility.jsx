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
      waiting: false,
      navigator: {
        currentYear: nowMoment.year(),
        currentMonth: nowMoment.month(),
      },
      viewTimelineRange: this.getMonthDateRange(),
      viewTimelineDatas: []
    };

  }

  componentDidMount() {
    this.sendRequest();
  }

  componentWillUnmount() {
    this.request.abort();
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

  sendRequest() {
    const range = this.state.viewTimelineRange;

    this.setState({
      waiting: true,
    });

    this.request = $.get('/timeline', {
      start: range['start'].format(),
      end: range['end'].format(),
    });

    this.request.done((res) => {
      console.log('fulfil', res);

    });

    this.request.fail((reject) => {
      console.log('rejected', reject);
    });

    this.request.always(() => {
      console.log('always');

      this.setState({
        waiting: false,
      });
    });
  }

  prepareTimeline () {
    let timeline = [];

    let reachedEnd = false;
    let counter    = 0;

    const dayOfMonth    = this.state.viewTimelineRange.start;
    const timelineDates = this.state.viewTimelineDatas;

    for (let day = 1 ; day <= parseInt(this.state.viewTimelineRange.end.format('DD')) ; day++) {
      const timelineDate = moment(dayOfMonth).add(day - 1, 'day');

      let singleRoomAvailable = 0;
      let singleRoomPrice = 0;
      let doubleRoomAvailable = 0;
      let doubleRoomPrice = 0;

      if (timelineDates.hasOwnProperty(timelineDate.format('YYYY-DD-MM'))) {
        const timelineDateObject = timelineDates[timelineDate.format('YYYY-DD-MM')];

        singleRoomAvailable = timelineDateObject.singleRoomAvailable;
        singleRoomPrice = timelineDateObject.singleRoomPrice;
        doubleRoomAvailable = timelineDateObject.doubleRoomAvailable;
        doubleRoomPrice = timelineDateObject.doubleRoomPrice;
      }

      timeline.push({
        dayName: timelineDate.format('dddd'),
        dayNumber: timelineDate.format('YYYY-DD-MM'),
        singleRoomAvailable: singleRoomAvailable,
        singleRoomPrice: singleRoomPrice,
        doubleRoomAvailable: doubleRoomAvailable,
        doubleRoomPrice: doubleRoomPrice,
      });
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
