"use script";

var React = require('react');

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
      rows.push(<TableRow key={row.num} row={row} onRemove={self.handleRowRemove} />);
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

var TableSortComp = React.createClass({
  getInitialState: function() {
    return {className: "pull-right glyphicon glyphicon-sort", sort: ""};
  },
  handleClick: function() {
    this.props.onClick(this.props.sort);
    this.setState({
      className: this.state.sort ?
      "pull-right glyphicon glyphicon-sort-by-attributes-alt" :
      "pull-right glyphicon glyphicon-sort-by-attributes",
      sort: this.state.sort ? "" : this.props.sort
    });
  },
  componentWillUpdate: function() {
    // Reset className and sort to default before rerender 
    // (not when parent render this component again)
    this.state.className = "pull-right glyphicon glyphicon-sort";
    this.state.sort = "";
  },
  render: function() {
    return (
      <span className={this.state.className} onClick={this.handleClick}></span>
    )
  }
});

var TableRow = React.createClass({
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

module.exports = TableComp;