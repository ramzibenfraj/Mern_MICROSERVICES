import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

const SignInForm = (props) => {
  const { handleSubmit, submitting } = props;
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setErrorMessage('');
        const data = await response.json();
        console.log(data.user)
        if (data.user.role === 'admin') {
          window.localStorage.setItem('isAdmin', true);
          window.location.href = "/products";
        } else {
          window.localStorage.removeItem('isAdmin');
          window.location.href = "/category";
          window.localStorage.setItem("userid", data.user.id);
        }
        window.localStorage.setItem("token", data.data);
       
        window.localStorage.setItem("loggedIn", true);
        console.log('Login successful:', data);
        

        // if (data.user.role === 'admin') {
        //   window.location.href = "/products";
        // } else {
        //   window.location.href = "/category";
        // }
        // Redirect to a different page or perform actions upon successful login
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.msg || 'Login failed');
        console.error('Login failed:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Server error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Email Field */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <Field
          name="email"
          component="input"
          type="email"
          placeholder="Your email address"
          className="form-control"
          required
        />
      </div>

      {/* Password Field */}
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <Field
          name="password"
          component="input"
          type="password"
          placeholder="******"
          className="form-control"
          required
        />
      </div>

      {/* Error Message */}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      {/* Submit Button */}
      <div>
        <button type="submit" className="btn btn-primary mb-3" disabled={submitting}>
          Log In
        </button>
      </div>

      {/* Links for account creation and password recovery */}
      <Link to="/account/signup" title="Sign Up">
        Create your account
      </Link>
      <Link to="/account/forgotpassword" title="Forgot Password">
        Forgot password?
      </Link>
    </form>
  );
};

export default reduxForm({
  form: 'signin',
})(SignInForm);
