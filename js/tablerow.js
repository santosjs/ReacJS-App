"use strict";

var React = require('react');

var TableRowComp = React.createClass({
  handleRowRemove: function() {
    this.props.onRemove(this.props.row);
  },
  render: function() {
    return (
      <tr>
        <td>{this.props.row.num}</td>
        <td>{this.props.row.firstName}</td>
        <td>{this.props.row.lastName}</td>
        <td>{this.props.row.phoneNumber}</td>
        <td>{this.props.row.age}</td>
        <td>{this.props.row.gender}</td>
        <td><input type="button" className="btn btn-danger btn-xs" value="Delete" onClick={this.handleRowRemove} /></td>
      </tr>
    )
  }
});

module.exports = TableRowComp;