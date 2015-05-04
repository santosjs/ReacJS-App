/** @jsx React.DOM */
var React = require('react');
var FormComp = require('../js/form');
var TableComp = require('../js/table');

var App = React.createClass({
  getInitialState: function() {
    return {
      tableRows: this.props.data || [],
      sortParam: ""
     };
  },
  handleRowRemove: function(row) {
    var index = -1;
    var rows = this.state.tableRows;

    // Find row to remove
    for (var i = 0; i < rows.length; i++) {
      if (row.num === rows[i].num) {
        index = i;
        break;
      }
    }

    rows.splice(index, 1);
    this.setState({ tableRows: rows });
  },
  handleAddRow: function(newRow) {
    this.setState({
      tableRows: this.state.tableRows.concat([newRow])
    })
  },
  handleSortTable: function (sortParam) {
    var dir = (sortParam == this.state.sortParam) ? -1 : 1;
    var rows = this.state.tableRows;

    // Sort by column
    rows.sort(function(a,b) {
      var x = a[sortParam];
      var y = b[sortParam];
      if (typeof x === "string") { /* ignore case sensitivity */
        x = x.toLowerCase();
        y = y.toLowerCase();
      }
      if(x < y) return -dir;
      if(x > y) return dir;
      return 0;
    });

    this.setState({
      tableRows: rows,
      sortParam: dir < 0 ? "" : sortParam
    })
  },
  render: function() {
    return (
      <div className="container">
        <div className="page-header">
          <h1>
            <span>React.js</span>
            <small> application</small>
          </h1>
        </div>
        <FormComp onAddRow={this.handleAddRow} />
        {
          // Don't show the table if tableRows have no data
          this.state.tableRows.length > 0 ?
          <TableComp 
            rows={this.state.tableRows}
            onRemove={this.handleRowRemove}
            onSort={this.handleSortTable} /> : null
        }
      </div>
    )
  }
});

var data = [
  {firstName: "Peter", lastName: "Parker", phoneNumber: 380916817294, age: 25, gender: "Male"},
  {firstName: "Bruce", lastName: "Wayne", phoneNumber: 85637611332, age: 41, gender: "Male"},
  {firstName: "Natalia", lastName: "Romanova", phoneNumber: 8432475384, age: 27, gender: "Female"}
];

// Run App component with dafault user data
React.render(<App data={data}/>, document.getElementById("app"));