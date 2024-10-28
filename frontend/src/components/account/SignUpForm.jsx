
import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { Link } from "react-router-dom";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import renderFormField from "../../helpers/renderFormField";
import {
  required,
  maxLength20,
  minLength8,
  email,
  name,
} from "../../helpers/validation";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";

const SignUpForm = (props) => {
  const { handleSubmit, submitting } = props;
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages

  const submitForm = async (values) => {
    console.log("User registered:", values);

    // Concatenate firstName and lastName into a name field
    const nameValue = `${values.firstName} ${values.lastName}`;
    // Create a new object with the concatenated name and add role field
    const updatedValues = {
      ...values,
      name: nameValue, // Add concatenated name
      role: "user", // Add role as "user"
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedValues), // Send updated values
      });

      if (response.ok) {
        setErrorMessage("");
        window.location.href = "/account/signin";
        const data = await response.json();
        console.log("User registered successfully:", data);
        
        // Perform any actions needed after successful registration
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
        setErrorMessage(errorData.msg || "register failed");
        // Handle registration errors if necessary
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle other errors if necessary
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="needs-validation"
      noValidate
    >
      <div className="row mb-3">
        <div className="col-md-6">
          <Field
            name="firstName"
            type="text"
            label="First Name"
            component={renderFormField}
            placeholder="First Name"
            validate={[required, name]}
            required={true}
          />
        </div>
        <div className="col-md-6">
          <Field
            name="lastName"
            type="text"
            label="Last Name"
            component={renderFormField}
            placeholder="Last Name"
            validate={[required, name]}
            required={true}
          />
        </div>
      </div>
      <Field
        name="email"
        type="string"
        label="e-mail"
        component={renderFormGroupField}
        placeholder="Your email address"
        icon={IconPhone}
        validate={[required, email]}
        required={true}
        className="mb-3"
      />
      <Field
        name="password"
        type="password"
        label="Your password"
        component={renderFormGroupField}
        placeholder="******"
        icon={IconShieldLock}
        validate={[required, maxLength20, minLength8]}
        required={true}
        maxLength="20"
        minLength="8"
        className="mb-3"
      />
              {/* Display error message if present */}
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
        {/* Submit button */}
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary mb-3"
          disabled={submitting}
        >

          Create
        </button>
      </div>
      <Link className="float-start" to="/account/signin" title="Sign In">
        Sing In
      </Link>
      <Link
        className="float-end"
        to="/account/forgotpassword"
        title="Forgot Password"
      >
        Forgot password?
      </Link>
      <div className="clearfix"></div>
      <hr></hr>
      <div className="row">
        <div className="col- text-center">
          <p className="text-muted small">Or you can join with</p>
        </div>
        <div className="col- text-center">
          <Link to="/" className="btn btn-light text-white bg-twitter me-3">
            <i className="bi bi-twitter-x" />
          </Link>
          <Link to="/" className="btn btn-light text-white me-3 bg-facebook">
            <i className="bi bi-facebook mx-1" />
          </Link>
          <Link to="/" className="btn btn-light text-white me-3 bg-google">
            <i className="bi bi-google mx-1" />
          </Link>
        </div>
      </div>
    </form>
  );
};

export default compose(
  reduxForm({
    form: "signup",
  })
)(SignUpForm);
