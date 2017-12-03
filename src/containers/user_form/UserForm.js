import React, { Component } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
// Redux
import { connect } from "react-redux";
import { saveContact, fetchContact } from "../../actions";
import { Field, reduxForm } from "redux-form";

// Fields
import formFields from "./formFields";

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
          <div className="col s6"> {this.renderFields(formFields.pers)}</div>
          <div className="col s6">{this.renderFields(formFields.address)}</div>
        </div>

        <br />
        <div className="row">
          <div className="col s12">
            {" "}
            {this.renderFields(formFields.contact)}
          </div>
        </div>
        <div className="row">
          <div className="col s12"> {this.renderFields(formFields.other)}</div>
        </div>

        <button type="submit" className="teal btn-flat right white-text">
          Save
          <i className="material-icons right">done</i>
        </button>
      </form>
    );
  }

  render() {
    console.log(this, "UserForm: render");
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

  let required_pers_fields = formFields.pers.filter(elem => {
    return elem.reguired == true;
  });

  let required_contact_fields = formFields.contact.filter(elem => {
    return elem.reguired == true;
  });

  let required_fields = [].concat(
    required_pers_fields,
    required_contact_fields
  );

  _.each(required_fields, ({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });

  errors.Email = validateEmails(values.Email || "");
  return errors;
}

export default connect(mapStateToProps, { fetchContact, saveContact })(
  reduxForm({
    form: "NewUserForm",
    validate: validate,
    enableReinitialize: false,
    keepDirtyOnReinitialize: false
  })(UserForm)
);
