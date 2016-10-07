import React, { Component } from 'react';

export default class PriceAndAvailibility extends Component {
    render() {
      return (
        <form className="form-inline">
          <table className="table table-bordered table-striped">
            <tbody>
              <tr>
                <th scope="row">
                  <span>Price and Availability:</span>
                </th>
              </tr>
            </tbody>
          </table>
        </form>
      );
    }
}
