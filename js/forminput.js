"use strict";

var React = require('react');

var FormInputComp = React.createClass({
  handleChange: function(e) {
    this.props.onChange(e);
  },
  handleBlur: function() {
    this.props.onBlur(this.props.id);
  },
  render: function() {
    var value = this.props.value;
    var className = "form-control";
    if (this.props.startValid) {
      className = (
        this.props.valid ? "form-control has-success" : "form-control has-error"
      );
    }

    return (
      <input
      id={this.props.id}
      type="text"
      className={className}
      value={value}
      onChange={this.handleChange}
      onBlur={this.handleBlur}
      placeholder={this.props.placeholder} />
    )
  }
});

module.exports = FormInputComp;