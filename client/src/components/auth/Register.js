import React, {Fragment, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const Register = ({setAlert, register, isAuthenticated}) => {
    const [formData, setFormData] = useState({
      name : "",
      email : "",
      password : "",
      password2 : ""
    });

    const {name, email, password, password2} = formData;

    const onChange = e => setFormData({...formData, [e.target.name] : e.target.value});

    const onSubmit = async e => {
      e.preventDefault();
      if(password !== password2){
        setAlert("Passwords don't match", "danger");
      }else{
        register({name, email, password});
      }
    }

    if(isAuthenticated){
      return <Navigate to="/dashboard"/>
    }

    return <Fragment>
    <h1 className="large text-primary">Sign Up As a Citizen of Gotham</h1>
    <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
    <form className="form" onSubmit = {e => onSubmit(e)}>
      <div className="form-group">
        <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />
      </div>
      <div className="form-group">
        <input type="email" placeholder="Email Address" value={email} name="email" onChange={e => onChange(e)} required/>
      </div>
      <div className="form-group">
        <input
          type="password"
          value = {password}
          onChange = {e => onChange(e)}
          placeholder="Password"
          name="password"
          minLength="8" required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          value = {password2}
          onChange = {e => onChange(e)}
          placeholder="Confirm Password"
          name="password2"
          minLength="8" required
        />
      </div>
      <input type="submit" class="btn btn-primary" value="Register" />
    </form>
    <p className="my-1">
      Already have an account? <Link to="/login">Sign In</Link>
    </p>
    </Fragment>
}

Register.propTypes = {
  setAlert : PropTypes.func.isRequired,
  register : PropTypes.func.isRequired,
  isAuthenticated : PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated : state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
