"use strict";

var React = require('react');

var TableSortComp = React.createClass({
  getInitialState: function() {
    return {className: "pull-right glyphicon glyphicon-sort", sort: ""}
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

module.exports = TableSortComp;