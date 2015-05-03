/** @jsx React.DOM */
App = React.createClass({
  getInitialState: function() {
    return { 
      tableRows: this.props.data || [],
      sortParam: ""
     };
  },
  handleRowRemove: function(row) {
    var index = -1;
    var rows = this.state.tableRows;

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

    rows.sort(function(a,b) {
      if(a[sortParam] < b[sortParam]) return -dir;
      if(a[sortParam] > b[sortParam]) return dir;
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

var FormComp = React.createClass({
  getInitialState: function() {
    return {
      startValid: {firstName: false, lastName: false, phoneNumber: false, age: false},
      firstName: "",
      lastName: "",
      phoneNumber: "",
      age: "",
      gender: "Male"
    }
  },
  handleFirstName: function(e) {
    this.setState({
      firstName: e.target.value
    })
  },
  handleLastName: function(e) {
    this.setState({
      lastName: e.target.value
    })
  },
  handlePhoneNumber: function(e) {
    this.setState({
      phoneNumber: e.target.value
    })
  },
  handleAge: function(e) {
    this.setState({
      age: e.target.value.trim()
    })
  },
  handleGender: function(e) {
    this.setState({
      gender: e.target.value
    })
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var valid = this.validate(this.state);
    var error = true;
    for (var prop in valid) {
      if (!valid[prop]) {
        error = false;
        break;
      }
    }

    if (error) {
      var st = this.state;
      var row = {
        firstName: st.firstName,
        lastName: st.lastName,
        phoneNumber: st.phoneNumber,
        age: st.age,
        gender: st.gender
      }
      this.props.onAddRow(row);

      st.startValid.firstName = false;
      st.startValid.lastName = false;
      st.startValid.phoneNumber = false;
      st.startValid.age = false;
      st.firstName = "";
      st.lastName = "";
      st.phoneNumber = "";
      st.age = "";
      st.gender = "Male";
      this.forceUpdate();
    } else {
      this.state.startValid = {firstName: true, lastName: true, phoneNumber: true, age: true},
      this.forceUpdate();
    }
  },
  validate: function(state) {
    return {
      firstName: /^( ?)*[a-z]{1,20}([ .'-]?[a-z]{1,20}){0,3}( ?)*$/i.test(state.firstName),
      lastName: /^( ?)*[a-z]{1,20}([ .'-]?[a-z]{1,20}){0,3}( ?)*$/i.test(state.lastName),
      phoneNumber: /^( ?)*(\+)?([0-9] ?){5,14}( ?)*$/i.test(state.phoneNumber),
      age: /^([1-9]|[1-9][0-9]|1[0-3][0-9])$/i.test(state.age),
      gender: /^(Male|Female)$/i.test(state.gender)
    };
  },
  handleBlur: function(id) {
    this.state.startValid[id] = true;
    var value = this.state[id].trim();
    this.state[id] = value.replace(/(\s){2,}/i, " ");
    this.forceUpdate();
  },
  render: function() {
    var valid = this.validate(this.state);

    return (
      <form onSubmit={this.handleSubmit} className="form-horizontal" autoComplete="off">
        <div className="form-group">
          <label htmlFor="firstName" className="col-sm-2 control-label">First Name</label>
          <div className="col-sm-6">
            <FormInputComp 
              onChange={this.handleFirstName}
              onBlur={this.handleBlur}
              valid={valid.firstName}
              startValid={this.state.startValid.firstName}
              value={this.state.firstName}
              id="firstName"
              placeholder="First Name" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="col-sm-2 control-label">Last Name</label>
          <div className="col-sm-6">
            <FormInputComp 
              onChange={this.handleLastName}
              onBlur={this.handleBlur}
              valid={valid.lastName}
              startValid={this.state.startValid.lastName}
              value={this.state.lastName}
              id="lastName"
              placeholder="Last Name" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber" className="col-sm-2 control-label">Phone Number</label>
          <div className="col-sm-6">
            <FormInputComp
              onChange={this.handlePhoneNumber}
              onBlur={this.handleBlur}
              valid={valid.phoneNumber}
              startValid={this.state.startValid.phoneNumber}
              value={this.state.phoneNumber}
              id="phoneNumber"
              placeholder="Phone Number" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="age" className="col-sm-2 control-label">Age</label>
          <div className="col-sm-2">
            <FormInputComp
              onChange={this.handleAge}
              onBlur={this.handleBlur}
              valid={valid.age}
              startValid={this.state.startValid.age}
              value={this.state.age}
              id="age"
              placeholder="Age" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="gender" className="col-sm-2 control-label">Gender</label>
          <div className="col-sm-2">
            <select value={this.state.gender} className="form-control" id="gender" onChange={this.handleGender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-default">Add to table</button>
            </div>
        </div>
      </form>
    )
  }
});

var FormInputComp = React.createClass({
  getInitialState: function(){
    return { validationStarted: false };
  },
  componentWillMount: function(){
    var startValidation = function(){
      this.setState({
        validationStarted: true
      })
    }.bind(this);

    if (this.props.value) {
      startValidation();
    }
  },
  handleChange: function(e) {
    //this.setState({ value: e.target.value })
    this.props.onChange(e);
  },
  handleBlur: function() {
    if (!this.state.validationStarted) {
      this.state.validationStarted = true;
    }
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
    return {className: "sort-icon glyphicon glyphicon-sort", sort: ""};
  },
  handleClick: function() {
    this.props.onClick(this.props.sort);
    this.setState({
      className: this.state.sort ?
      "sort-icon glyphicon glyphicon-sort-by-attributes-alt" :
      "sort-icon glyphicon glyphicon-sort-by-attributes",
      sort: this.state.sort ? "" : this.props.sort
    });
  },
  componentWillUpdate: function() {
    this.state.className = "sort-icon glyphicon glyphicon-sort";
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

var data = [
  {firstName: "Peter", lastName: "Parker", phoneNumber: 380916817294, age: 25, gender: "Male"},
  {firstName: "Bruce", lastName: "Wayne", phoneNumber: 85637611332, age: 41, gender: "Male"},
  {firstName: "Natalia", lastName: "Romanova", phoneNumber: 8432475384, age: 27, gender: "Female"}
]

React.render(<App data={data}/>, document.getElementById("app"));