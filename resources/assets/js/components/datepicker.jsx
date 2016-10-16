import { Component, PropTypes } from 'react';

export default class DatepickerInput extends Component {
  render() {
    return (
      <input
        onClick={this.props.onClick}
        type="text"
        className="form-control input-sm"
        onChange={() => {}}
        value={this.props.value} />
    );
  }
}

DatepickerInput.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};
