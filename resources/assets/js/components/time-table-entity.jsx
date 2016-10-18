import React, { Component } from 'react';
import TimeTableEntityUpdateField from './time-table-entity-update-field.jsx';

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

  openUpdateField(ref) {
    this.refs[ref].show();
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
          <a href="javascript:void(0);" onClick={this.openUpdateField.bind(this, 'single_room_available')}>
            {this.state.singleRoomAvailable}
          </a>
          <TimeTableEntityUpdateField
            date={this.props.date}
            show={false}
            value={this.state.singleRoomAvailable}
            field="single_room_available"
            onSuccessUpdate={this.props.onSuccessUpdate.bind(this)}
            onFailedUpdate={this.props.onFailedUpdate.bind(this)}
            ref="single_room_available" />
        </div>
        <div className="row-price">
          <a href="javascript:void(0);" onClick={this.openUpdateField.bind(this, 'single_room_price')}>
            {this.state.singleRoomPrice}
          </a>
          <span>IDR</span>
          <TimeTableEntityUpdateField
            date={this.props.date}
            show={false}
            value={this.state.singleRoomPrice}
            field="single_room_price"
            onSuccessUpdate={this.props.onSuccessUpdate.bind(this)}
            onFailedUpdate={this.props.onFailedUpdate.bind(this)}
            ref="single_room_price" />
        </div>
        <div className="row-double-room"></div>
        <div className="row-room-available">
          <a href="javascript:void(0);" onClick={this.openUpdateField.bind(this, 'double_room_available')}>
            {this.state.doubleRoomAvailable}
          </a>

          <TimeTableEntityUpdateField
            date={this.props.date}
            show={false}
            value={this.state.doubleRoomAvailable}
            field="double_room_available"
            onSuccessUpdate={this.props.onSuccessUpdate.bind(this)}
            onFailedUpdate={this.props.onFailedUpdate.bind(this)}
            ref="double_room_available" />
        </div>
        <div className="row-price">
          <a href="javascript:void(0);" onClick={this.openUpdateField.bind(this, 'double_room_price')}>
            {this.state.doubleRoomPrice}
          </a>
          <span>IDR</span>
          <TimeTableEntityUpdateField
            date={this.props.date}
            show={false}
            value={this.state.doubleRoomPrice}
            field="double_room_price"
            onSuccessUpdate={this.props.onSuccessUpdate.bind(this)}
            onFailedUpdate={this.props.onFailedUpdate.bind(this)}
            ref="double_room_price" />
        </div>
      </div>
    );
  }
}
