import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error">
          <div className="header"> {error}</div>
        </div>
      );
    }
  };

  renderInput = ({ label, input, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="title" component={this.renderInput} label="title" />
        <Field
          name="description"
          component={this.renderInput}
          label="description"
        />
        <button className="ui primary button">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "you need to enter a title";
  }

  if (!formValues.title) {
    errors.description = "you need to enter a description";
  }

  return errors;
};

export default reduxForm({
  form: "StreamForm",
  validate: validate,
})(StreamForm);
