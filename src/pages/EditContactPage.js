import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { saveContact, fetchContact } from "../actions";

import formFields, {
  address_fields,
  contact_fields,
  other
} from "../containers/user_form/formFields";
import formFieldsTempl from "../containers/user_form/formFieldTempl";

class EditContactForm extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.fetchContact(id);
  }

  formSubmit(values) {
    console.log(values, "SUBMIT FORM");
    this.props.saveContact(values, () => {
      this.props.history.push("/");
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

  render() {
    console.log(this, "THIS");
    // console.log(this.props.initialValues, 'this.props.initialValues');
    // console.log(this.props, 'this.props');

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
    form: "ContactForm",
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
  })(EditContactForm)
);
