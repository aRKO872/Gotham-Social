import React, {Fragment, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {login} from '../../actions/auth';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const Login = ({login, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    email : "",
    password : ""
  });

  const {email, password} = formData;

  const onChange = e => setFormData({...formData, [e.target.name] : e.target.value});

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  }

  //redirecting if jwt is present(isAuthenticated is not null)
  if(isAuthenticated){
    return <Navigate to="/dashboard"/>
  }

  return <Fragment>
    <h1 className="large text-primary">Sign In As a Citizen of Gotham</h1>
    <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
    <form className="form" onSubmit={e => onSubmit(e)}>
      <div className="form-group">
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          onChange={e => onChange(e)}
          value={email}
          required
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={e => onChange(e)}
          value={password}
          minLength="8"
          required
        />
      </div>
      <input type="submit" class="btn btn-primary" value="Login" />
    </form>
    <p class="my-1">
      Don't have an account? <Link to="/register">Sign Up</Link>
    </p>
  </Fragment>;
}

Login.propTypes = {
  login : PropTypes.func.isRequired,
  isAuthenticated : PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
