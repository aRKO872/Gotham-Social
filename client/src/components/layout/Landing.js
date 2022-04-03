import React from 'react';
import {Link, Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const Landing = ({ isAuthenticated }) => {
    if(isAuthenticated){
      return <Navigate to="/dashboard"/>
    }
    return (
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Gotham Social</h1>
            <p className="lead">
              Create your profile, and get to connect with others from
              Gotham City
            </p>
            <div className="buttons">
              <Link to="/register" class="btn btn-primary">Sign Up</Link>
              <Link to="/login" class="btn btn-light">Login</Link>
            </div>
          </div>
        </div>
      </section>
    )
}

Landing.propTypes = {
  isAuthenticated : PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
