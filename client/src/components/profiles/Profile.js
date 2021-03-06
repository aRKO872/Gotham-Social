import React, {Fragment, useEffect} from 'react'
import {connect} from "react-redux"
import Spinner from '../layout/Spinner';
import {Link, useParams} from "react-router-dom"
import ProfileTop from "./ProfileTop"
import ProfileAbout from "./ProfileAbout"
import ProfileEducation from "./ProfileEducation"
import { getProfileById } from '../../actions/profile';
import PropTypes from 'prop-types'

const Profile = ({
  getProfileById,
  profile : {profile, loading}, auth
}) => {
    const {id} = useParams();
    useEffect(() => {
      getProfileById(id);
    }, [getProfileById, id]);
    return (
      <Fragment>
        {profile === null || loading ? (<Spinner/>) : (
          <Fragment>
            <Link to="/profiles" className="btn btn-light">Back to Citizen Profiles</Link>
            {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-primary">Edit Profile</Link>
            )}
            <div class="profile-grid my-1">
              <ProfileTop profile={profile}/>
              <ProfileAbout profile={profile}/>
              <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation key={education._id} education={education}/>
                  ))}
                </Fragment>
              ) : (
                <h4>No education provided</h4>
              )}
            </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
}

Profile.propTypes = {
  getProfileById : PropTypes.func.isRequired,
  profile : PropTypes.object.isRequired,
  auth : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile : state.profile,
  auth : state.auth
});

export default connect(mapStateToProps, {getProfileById})(Profile);
