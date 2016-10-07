import React, { Component } from 'react';

export default class Operation extends Component {
    render() {
        return (
          <form className="form-inline">
            <table className="table table-bordered table-striped">
              <tbody>
                <tr>
                  <th scope="row">
                    <span>Bulk Operations</span>
                  </th>
                </tr>
                <tr>
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
                <tr>
                  <th scope="row">
                    <div className="pull-left">
                      <span>Select Days:</span>
                    </div>
                    <div className="col-md-2">
                      <div className="form-group">
                        <span className="date-range-row-span">From: </span>
                        <input type="text" className="form-control input-sm" />
                      </div>
                      <div className="newline"></div>
                      <div className="form-group">
                        <span className="date-range-row-span">To: </span>
                        <input type="text" className="form-control input-sm" />
                      </div>
                    </div>
                    <div className="pull-left">
                      <span>Refine Days:</span>
                    </div>
                    <div className="col-md-1">
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
                    <div className="col-md-1">
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
                    <div className="col-md-1">
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
                    <div className="col-md-1">
                      <div className="checkbox pull-left">
                        <label>
                          <input type="checkbox" />
                          <span>Sundays</span>
                        </label>
                      </div>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th>
                    <div className="form-group">
                      <span className="change-row-span">Change Price To: </span>
                      <input type="text" className="form-control input-sm" />
                    </div>
                    <div className="newline"></div>
                    <div className="form-group">
                      <span className="change-row-span">Change Availability To: </span>
                      <input type="text" className="form-control input-sm" />
                    </div>
                  </th>
                </tr>
                <tr>
                  <th scope="row">
                    <button type="button" className="btn btn-default btn-sm">Cancel</button>
                    {' '}
                    <button type="button" className="btn btn-success btn-sm">Update</button>
                  </th>
                </tr>
              </tbody>
            </table>
          </form>
        );
    }
}
