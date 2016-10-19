import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import $ from 'jquery';
import cookie from 'react-cookie';
import DatePickerInput from './datepicker.jsx';
import Waiting from './waiting.jsx';
import NotificationSystem from 'react-notification-system';

require('react-datepicker/dist/react-datepicker.css');
const nowMoment = moment();

export default class Operation extends Component {
  constructor(props) {
    super(props);

    const operationCookies = cookie.load('operation');

    this.state = {
      waiting: false,
      changePriceTo: operationCookies ? operationCookies.changePriceTo : 0,
      changeAvailibilityTo: operationCookies
        ? operationCookies.changeAvailibilityTo
        : 0,
      roomType: operationCookies ? operationCookies.roomType : 'single',
      dateFrom: operationCookies ? moment(operationCookies.dateFrom) : nowMoment,
      dateTo: operationCookies ? moment(operationCookies.dateTo) : nowMoment,
      isBulkOperationOpen: false,
      allDays: operationCookies ? operationCookies.allDays : false,
      allWeekdays: operationCookies ? operationCookies.allWeekdays : false,
      allWeekends: operationCookies ? operationCookies.allWeekends : false,
      daysOfWeek: {
        monday: operationCookies
          ? operationCookies.daysOfWeek.monday
          : false,
        tuesday: operationCookies
          ? operationCookies.daysOfWeek.tuesday
          : false,
        wednesday: operationCookies
          ? operationCookies.daysOfWeek.wednesday
          : false,
        thursday: operationCookies
          ? operationCookies.daysOfWeek.thursday
          : false,
        friday: operationCookies
          ? operationCookies.daysOfWeek.friday
          : false,
        saturday: operationCookies
          ? operationCookies.daysOfWeek.saturday
          : false,
        sunday: operationCookies
          ? operationCookies.daysOfWeek.sunday
          : false,
      }
    };
  }

  componentWillUnmount() {
    if (this.request) {
      this.request.abort();
    }
  }
  
  doSetState(states) {
    this.setState(states);

    setTimeout(() => {
      cookie.save('operation', this.state, { path: '/' });
    }, 0);
  }

  handleChangeDateFrom(date) {
    this.doSetState({
      dateFrom: date,
    });
  }

  handleChangeDateTo(date) {
    this.doSetState({
      dateTo: date,
    });
  }

  toggle() {
    if (this.state.isBulkOperationOpen) {
      return;
    }

    this.doSetState({
      isBulkOperationOpen: true,
    });
  }

  cancel() {
    this.doSetState({
      isBulkOperationOpen: false,
    });
  }

  showNotification(message, level) {
    this.refs.operationNotificationSystem.addNotification({
      message: message,
      level: level,
      position: 'bl', // bottom center
    });
  }

  sendUpdateRequest() {
    this.doSetState({
      waiting: true,
    });

    const state = this.state;

    this.request = $.ajax({
      url: '/timetable',
      method: 'put',
      data: {
        changePriceTo: state.changePriceTo,
        changeAvailibilityTo: state.changeAvailibilityTo,
        roomType: state.roomType,
        dateStart: state.dateFrom.format(),
        dateEnd: state.dateTo.format(),
        daysOfWeek: {
          monday: state.daysOfWeek.monday ? '1' : '0',
          tuesday: state.daysOfWeek.tuesday ? '1' : '0',
          wednesday: state.daysOfWeek.wednesday ? '1' : '0',
          thursday: state.daysOfWeek.thursday ? '1' : '0',
          friday: state.daysOfWeek.friday ? '1' : '0',
          saturday: state.daysOfWeek.saturday ? '1' : '0',
          sunday: state.daysOfWeek.sunday ? '1' : '0',
        },
      }
    });

    this.request.done((items) => {
      this.showNotification('Dates has been updated', 'success');

      this.doSetState({
        isBulkOperationOpen: false,
      });

      $('.price-and-availibility-refresh').click();
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


  checkAllDays() {
    this.doSetState({
      allDays: true,
      allWeekdays: false,
      allWeekends: false,
      daysOfWeek: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      }
    });
  }

  checkAllWeekdays() {
    this.doSetState({
      allDays: false,
      allWeekdays: true,
      allWeekends: false,
      daysOfWeek: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      }
    });
  }

  checkAllWeekends() {
    this.doSetState({
      allDays: false,
      allWeekdays: false,
      allWeekends: true,
      daysOfWeek: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: true,
        sunday: true,
      }
    });
  }

  dayToggle(day) {
    const days = this.state.daysOfWeek;
    this.doSetState({
      allDays: false,
      allWeekdays: false,
      allWeekends: false,
      daysOfWeek: {
        monday: day === 'monday' ? !days.monday : days.monday,
        tuesday: day === 'tuesday' ? !days.tuesday : days.tuesday,
        wednesday: day === 'wednesday' ? !days.wednesday : days.wednesday,
        thursday: day === 'thursday' ? !days.thursday : days.thursday,
        friday: day === 'friday' ? !days.friday : days.friday,
        saturday: day === 'saturday' ? !days.saturday : days.saturday,
        sunday: day === 'sunday' ? !days.sunday : days.sunday,
      }
    });
  }

  render() {
    return (
      <form className="form-inline operation">
        <table className="table table-bordered table-striped table-operation">
          <tbody>
            <tr>
              <th scope="row">
                <a href="javascript:void(0);" onClick={this.toggle.bind(this)}>Bulk Operations</a>
              </th>
            </tr>
            <tr className={!this.state.isBulkOperationOpen ? 'hidden' : ''}>
              <th>
                <div className="form-group">
                  <span>Select Room: </span>
                  <select
                    onChange={(e) => {
                      this.doSetState({
                        roomType: e.target.value,
                      });
                    }}
                    value={this.state.roomType}
                    className="form-control input-sm">
                    <option value="single">Single Room</option>
                    <option value="double">Double Room</option>
                  </select>
                </div>
              </th>
            </tr>
            <tr className={!this.state.isBulkOperationOpen ? 'hidden' : ''}>
              <th scope="row">
                <div className="pull-left">
                  <span>Select Days:</span>
                </div>
                <div className="mobile-new-line"></div>
                <div className="col-md-2">
                  <div className="form-group">
                    <span className="date-range-row-span">From: </span>
                      <DatePicker
                        maxDate={
                          this.state.dateTo !== nowMoment
                          ? this.state.dateTo
                          : null
                        }
                        customInput={<DatePickerInput />}
                        selected={this.state.dateFrom}
                        onChange={this.handleChangeDateFrom.bind(this)} />
                  </div>
                  <div className="newline"></div>
                  <div className="form-group">
                    <span className="date-range-row-span">To: </span>
                    <DatePicker
                      minDate={
                        this.state.dateFrom !== nowMoment
                        ? this.state.dateFrom
                        : null
                      }
                      customInput={<DatePickerInput />}
                      selected={this.state.dateTo}
                      onChange={this.handleChangeDateTo.bind(this)} />
                  </div>
                </div>
                <div className="mobile-new-line"></div>
                <div className="pull-left">
                  <span>Refine Days:</span>
                </div>
                <div className="mobile-new-line"></div>
                <div className="col-md-1 col-xs-6">
                  <div className="checkbox pull-left">
                    <label>
                      <input
                        onChange={this.checkAllDays.bind(this)}
                        checked={this.state.allDays}
                        type="checkbox" />
                      <span>All Days</span>
                    </label>
                  </div>
                  <div className="checkbox pull-left">
                    <label>
                      <input
                        onChange={this.checkAllWeekdays.bind(this)}
                        checked={this.state.allWeekdays}
                        type="checkbox" />
                      <span>All Weekdays</span>
                    </label>
                  </div>
                  <div className="checkbox pull-left">
                    <label>
                      <input
                        onChange={this.checkAllWeekends.bind(this)}
                        checked={this.state.allWeekends}
                        type="checkbox" />
                      <span>All Weekends</span>
                    </label>
                  </div>
                </div>
                <div className="col-md-1 col-xs-6">
                  <div className="checkbox pull-left">
                    <label>
                      <input
                        onChange={() => {
                          this.dayToggle('monday');
                        }}
                        checked={this.state.daysOfWeek.monday}
                        type="checkbox" />
                      <span>Mondays</span>
                    </label>
                  </div>
                  <div className="checkbox pull-left">
                    <label>
                      <input
                        onChange={() => {
                          this.dayToggle('tuesday');
                        }}
                        checked={this.state.daysOfWeek.tuesday}
                        type="checkbox" />
                      <span>Tuesdays</span>
                    </label>
                  </div>
                  <div className="checkbox pull-left">
                    <label>
                      <input
                        onChange={() => {
                          this.dayToggle('wednesday');
                        }}
                        checked={this.state.daysOfWeek.wednesday}
                        type="checkbox" />
                      <span>Wednesdays</span>
                    </label>
                  </div>
                </div>
                <div className="col-md-1 col-xs-6">
                  <div className="checkbox pull-left">
                    <label>
                      <input
                        onChange={() => {
                          this.dayToggle('thursday');
                        }}
                        checked={this.state.daysOfWeek.thursday}
                        type="checkbox" />
                      <span>Thursdays</span>
                    </label>
                  </div>
                  <div className="checkbox pull-left">
                    <label>
                      <input
                        onChange={() => {
                          this.dayToggle('friday');
                        }}
                        checked={this.state.daysOfWeek.friday}
                        type="checkbox" />
                      <span>Fridays</span>
                    </label>
                  </div>
                  <div className="checkbox pull-left">
                    <label>
                      <input
                        onChange={() => {
                          this.dayToggle('saturday');
                        }}
                        checked={this.state.daysOfWeek.saturday}
                        type="checkbox" />
                      <span>Saturdays</span>
                    </label>
                  </div>
                </div>
                <div className="col-md-1 col-xs-6">
                  <div className="checkbox pull-left">
                    <label>
                      <input
                        onChange={() => {
                          this.dayToggle('sunday');
                        }}
                        checked={this.state.daysOfWeek.sunday}
                        type="checkbox" />
                      <span>Sundays</span>
                    </label>
                  </div>
                </div>
              </th>
            </tr>
            <tr className={!this.state.isBulkOperationOpen ? 'hidden' : ''}>
              <th>
                <div className="form-group">
                  <span className="change-row-span">Change Price To: </span>
                  <input
                    onChange={(e) => {
                      this.doSetState({
                        changePriceTo: e.target.value,
                      });
                    }}
                    value={this.state.changePriceTo}
                    type="number"
                    className="form-control input-sm" />
                </div>
                <div className="newline"></div>
                <div className="form-group">
                  <span className="change-row-span">Change Availability To: </span>
                  <input
                    onChange={(e) => {
                      let value = e.target.value;

                      if (value > 5) {
                        value = 5;
                      }

                      if (value < 0) {
                        value = 0;
                      }
                      
                      this.doSetState({
                        changeAvailibilityTo: value,
                      });
                    }}
                    value={this.state.changeAvailibilityTo}
                    type="number"
                    className="form-control input-sm" />
                </div>
              </th>
            </tr>
            <tr className={!this.state.isBulkOperationOpen ? 'hidden' : ''}>
              <th scope="row">
                <button
                  onClick={this.cancel.bind(this)}
                  type="button"
                  className="btn btn-default btn-sm">Cancel</button>
                {' '}
                <button
                  onClick={this.sendUpdateRequest.bind(this)}
                  type="button"
                  className="btn btn-success btn-sm">Update</button>
              </th>
            </tr>
          </tbody>
        </table>
        <Waiting show={this.state.waiting} />
        <NotificationSystem ref="operationNotificationSystem" />
      </form>
    );
  }
}
