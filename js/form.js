"use strict";
var React = require('react');

var FormComp = React.createClass({
  getInitialState: function() {
    return {
      // Don't start validation until input field is empty
      startValid: {firstName: false, lastName: false, phoneNumber: false, age: false},
      firstName: "",
      lastName: "",
      phoneNumber: "",
      age: "",
      gender: "Male",
      errorMessage: "Check the correctness of the data entry"
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
    var error = false;

    // Check all input field
    for (var prop in valid) {
      if (!valid[prop]) {
        error = true;
        break;
      }
    }

    // Add data to the table if there are no errors
    if (!error) {
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
      this.forceUpdate(); /* rerender with dafault fields */
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
      age: /^([1-9]|[1-9][0-9]|1[0-3][0-9])$/i.test(state.age) /* age range 1-139 */
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
    var error = this.state.errorMessage;

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
              id="firstName" />
            {
              !valid.firstName && this.state.startValid.firstName ?
              <span className="help-block">{error}</span> : null
            }
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
              id="lastName" />
            {
              !valid.lastName && this.state.startValid.lastName ?
              <span className="help-block">{error}</span> : null
            }
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
              id="phoneNumber" />
            {
              !valid.phoneNumber && this.state.startValid.phoneNumber ?
              <span className="help-block">{error}</span> : null
            }
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
              id="age" />
          </div>
          {
            !valid.age && this.state.startValid.age ?
            <span className="help-block">{error}</span> : null
          }
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

module.exports = FormComp;