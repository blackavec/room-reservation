import { Component } from 'react';
import $ from 'jquery';
import Waiting from './waiting.jsx';

export default class TimeTableEntityUpdateField extends Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  componentWillReceiveProps(props) {
    this.setState(props);
  }

  componentWillUnmount() {
    if (this.request) {
      this.request.abort();
    }
  }

  show() {
    this.setState({
      show: true,
    });
  }

  hide() {
    this.setState({
      waiting: false,
      show: false,
    });
  }

  sendUpdateRequest() {
    this.setState({
      waiting: true,
    });

    this.request = $.ajax({
      url: '/timetable',
      method: 'patch',
      data: {
        date: this.props.date.format(),
        field: this.props.field,
        value: this.state.value,
      }
    });

    this.request.done(() => {
      if (this.props.hasOwnProperty('onSuccessUpdate')) {
        this.props.onSuccessUpdate(this.props.date, this.props.value, this.state.value);
      }

      this.hide();
    });

    this.request.fail(() => {
      if (this.props.hasOwnProperty('onFailedUpdate')) {
        this.props.onFailedUpdate(this.props.date, this.props.value, this.state.value);
      }
    });

    this.request.always(() => {
      this.setState({
        waiting: false,
      });
    });
  }

  render() {
    if (!this.state.show) {
      return null;
    }

    return (
      <div className="time-table-update-field-container">
        <div className="time-table-update-field">
          <input
            type="number"
            className="form-control input-sm"
            onChange={(e) => {
              let value = e.target.value;

              console.log(this.props.field);

              if (
                value > 5 && (
                  this.props.field === 'single_room_available' || this.props.field === 'double_room_available'
                )
              ) {
                value = 5;
              }

              this.setState({
                okDisabled: parseInt(value) < 0,
                value,
              });
            }}
            value={this.state.value}/>
          <button
            onClick={this.sendUpdateRequest.bind(this)}
            disabled={this.state.okDisabled || this.state.waiting}
            className="btn btn-info btn-sm">
            <span className="glyphicon glyphicon-ok"></span>
          </button>
          <button
            onClick={() => {
              this.setState({
                value: this.props.value,
              });

              this.hide();
            }}
            disabled={this.state.waiting}
            className="btn btn-default btn-sm">
            <span className="glyphicon glyphicon-remove"></span>
          </button>
          <Waiting show={this.state.waiting} />
        </div>
        <span className="glyphicon glyphicon-triangle-bottom"></span>
      </div>
    );
  }
}
