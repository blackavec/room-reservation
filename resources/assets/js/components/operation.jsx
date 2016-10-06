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
                    <span>Select Days:</span>
                  </th>
                </tr>
                <tr>
                  <th>
                    <div className="form-group">
                      <span className="change-row-span">Change Price To: </span>
                      <input type="text" className="form-control input-sm" />
                    </div>
                    <br />
                    <br />
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

// module.exports = App;
