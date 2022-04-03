import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link, Navigate} from 'react-router-dom';
import {connect} from "react-redux";
import {getCurrentProfile, deleteAccount} from "../../actions/profile";
import Education from "./Education";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";

const Dashboard = ({getCurrentProfile, deleteAccount, auth : {user},
  profile : {profile, loading}}) => {
    useEffect(() => {
      getCurrentProfile();
    }, [getCurrentProfile]);
    return loading && profile === null ? <Spinner /> :
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead"><i className="fas fa-user"></i> Welcome {user && user.name}</p>
      {profile !== null ? (<Fragment>
          <DashboardActions/>
          {profile.education.length === 0 ?
            <Fragment></Fragment> :
            <Fragment><Education education={profile.education}/></Fragment>}
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
        </Fragment>) :
        (<Fragment>
        <p>You have not yet set up your citizen profile, please set it up..</p>
        <Link to="/create-profile" className="btn btn-primary my-1">Create Citizen Profile</Link>
        </Fragment>)}
    </Fragment>;
}

Dashboard.propTypes = {
  getCurrentProfile : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  profile : PropTypes.object.isRequired,
  deleteAccount : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth : state.auth,
  profile : state.profile
});

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);
