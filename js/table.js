"use script";

var React = require('react');
var TableSortComp = require('../js/tablesort');
var TableRowComp = require('../js/tablerow');

var TableComp = React.createClass({
  handleRowRemove: function(row) {
    this.props.onRemove(row);
  },
  handleClick: function(sortParam) {
    this.props.onSort(sortParam);
  },
  render: function() {
    var rows = [];
    var number = 0;
    var self = this;

    this.props.rows.map(function(row) {
      number++;
      row.num = number;
      // Identity each child by assigning it a "key"
      rows.push(<TableRowComp key={row.num} row={row} onRemove={self.handleRowRemove} />);
    });

    return (
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
          <th>#</th>
          <th>First Name <TableSortComp onClick={this.handleClick} sort="firstName" /></th>
          <th>Last Name <TableSortComp onClick={this.handleClick} sort="lastName" /></th>
          <th>Phone Number <TableSortComp onClick={this.handleClick} sort="phoneNumber" /></th>
          <th>Age <TableSortComp onClick={this.handleClick} sort="age" /></th>
          <th>Gender <TableSortComp onClick={this.handleClick} sort="gender" /></th>
          <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
});

module.exports = TableComp;