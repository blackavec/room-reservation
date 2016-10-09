import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import DatePickerInput from './datepicker.jsx';
import moment from 'moment';

require('react-datepicker/dist/react-datepicker.css');
const nowMoment = moment();

export default class Operation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateFrom: nowMoment,
      dateTo: nowMoment,
      isBulkOperationOpen: false,
    };
  }

  handleChangeDateFrom(date) {
    this.setState({
      dateFrom: date,
    });
  }

  handleChangeDateTo(date) {
    this.setState({
      dateTo: date,
    });
  }

  toggle() {
    if (this.state.isBulkOperationOpen) {
      return;
    }

    this.setState({
      isBulkOperationOpen: true,
    });
  }

  cancel() {
    this.setState({
      isBulkOperationOpen: false,
    });
  }

  update() {
    console.log('update');
  }

  render() {
    return (
      <form className="form-inline">
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
                  <select className="form-control input-sm">
                    <option>Single Room</option>
                    <option>Double Room</option>
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
                      <input type="checkbox" />
                      <span>All Days</span>
                    </label>
                  </div>
                  <div className="checkbox pull-left">
                    <label>
                      <input type="checkbox" />
                      <span>All Weekdays</span>
                    </label>
                  </div>
                  <div className="checkbox pull-left">
                    <label>
                      <input type="checkbox" />
                      <span>All Weekends</span>
                    </label>
                  </div>
                </div>
                <div className="col-md-1 col-xs-6">
                  <div className="checkbox pull-left">
                    <label>
                      <input type="checkbox" />
                      <span>Mondays</span>
                    </label>
                  </div>
                  <div className="checkbox pull-left">
                    <label>
                      <input type="checkbox" />
                      <span>Tuesdays</span>
                    </label>
                  </div>
                  <div className="checkbox pull-left">
                    <label>
                      <input type="checkbox" />
                      <span>Wednesdays</span>
                    </label>
                  </div>
                </div>
                <div className="col-md-1 col-xs-6">
                  <div className="checkbox pull-left">
                    <label>
                      <input type="checkbox" />
                      <span>Thursdays</span>
                    </label>
                  </div>
                  <div className="checkbox pull-left">
                    <label>
                      <input type="checkbox" />
                      <span>Fridays</span>
                    </label>
                  </div>
                  <div className="checkbox pull-left">
                    <label>
                      <input type="checkbox" />
                      <span>Saturdays</span>
                    </label>
                  </div>
                </div>
                <div className="col-md-1 col-xs-6">
                  <div className="checkbox pull-left">
                    <label>
                      <input type="checkbox" />
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
                  <input type="number" className="form-control input-sm" />
                </div>
                <div className="newline"></div>
                <div className="form-group">
                  <span className="change-row-span">Change Availability To: </span>
                  <input type="number" className="form-control input-sm" />
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
                  onClick={this.update.bind(this)}
                  type="button"
                  className="btn btn-success btn-sm">Update</button>
              </th>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
}
