import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import Spinner from "../layout/Spinner"
import {getProfiles} from "../../actions/profile"
import ProfileItems from "./ProfileItems";
import {connect} from "react-redux";

const Profiles = ({getProfiles, profile : {profiles, loading}}) => {
    useEffect(() => {
      getProfiles();
    }, [getProfiles]);
    return <Fragment>
      {loading ? <Spinner /> : <Fragment>{profiles.length === 0 ? <h4>No Citizen Profiles Found</h4> :
      <Fragment>
        <h1 className="large text-primary">Citizens</h1>
        <p className="lead">Browse and meet other citizens of Gotham!</p>
        <div className="profiles">
          {profiles.map(profile => (
            <ProfileItems key={profile._id} profile={profile}/>
          ))}
        </div>
      </Fragment>}</Fragment>}
    </Fragment>
}

Profiles.propTypes = {
  getProfiles : PropTypes.func.isRequired,
  profile : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile : state.profile
});

export default connect(mapStateToProps, {getProfiles})(Profiles);
