import React, { Component } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { saveContact, fetchContact } from "../../actions";
import { Field, reduxForm } from "redux-form";

// Fields
import formFields, {
  address_fields,
  contact_fields,
  other
} from "./formFields";

import formFieldsTempl from "./formFieldTempl";

class UserForm extends Component {
  constructor(props) {
    super(props);
  }

  formSubmit(values) {
    console.log(values, "SUBMIT FORM");

    this.props.saveContact(values, () => {
      //console.log("this - callback ");
      this.props.userCreatedCallback(values);
    });
  }

  // componentWillUpdate(nextProps, nextState) {
  //   console.log("componentWillUpdate");
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   console.log("componentDidUpdate  prevState");
  // }
  //
  // componentWillUnmount() {
  //   console.log("componentWillUnmount");
  // }
  renderFields(array = []) {
    return array.map(field => {
      // console.log(field.name, 'FIELD');
      return (
        <Field
          key={field.name}
          name={field.name}
          component={formFieldsTempl}
          label={field.label}
          type={field.type ? field.type : "text"}
        />
      );
    });
  }
  renderContent() {
    const { handleSubmit } = this.props;

      return (
        <form onSubmit={handleSubmit(this.formSubmit.bind(this))}>
          <div className="row">
            <div className="col s6"> {this.renderFields(formFields)}</div>
            <div className="col s6">{this.renderFields(address_fields)}</div>
          </div>

          <br />
          <div className="row">
            <div className="col s12"> {this.renderFields(contact_fields)}</div>
          </div>
          <div className="row">
            <div className="col s12"> {this.renderFields(other)}</div>
          </div>

          <Link to="/" className="red btn-flat white-text">
            Cansel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Save
            <i className="material-icons right">done</i>
          </button>
        </form>
      );

  }

  render() {
    console.log("render");
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps({ selected_contact }) {
  return {
    initialValues: selected_contact
  };
}

function validate(values) {
  const errors = {};

  if (!values.firstName) {
    errors.title = "Enter a First Name";
  }

  return errors;
}

export default connect(mapStateToProps, { fetchContact, saveContact })(
  reduxForm({
    form: "UserForm",
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
  })(UserForm)
);
