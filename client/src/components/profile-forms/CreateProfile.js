import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {createProfile} from "../../actions/profile";

const CreateProfile = ({
  profile: { profile, loading },
  createProfile
  }) => {
  const [formData, setFormData] = useState({
    company : '',
    location : '',
    status : '',
    likings : '',
    bio : '',
    photo : '',
    facebook : '',
    instagram : '',
    linkedin : ''
  });
  const [showSocials, toggleSocialValue] = useState(false);
  const navigate = useNavigate();
  const {
    company,
    location,
    status,
    likings,
    bio,
    photo,
    facebook,
    instagram,
    linkedin
  } = formData;

  const onChange = e => setFormData({...formData, [e.target.name] : e.target.value});

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate);
  };

  return (
      <Fragment>
        <h1 className="large text-primary">
        Create Your Citizen Profile
        </h1>
        <p className="lead">
          <i className="fas fa-user"></i> Let's get some information to create your
          citizen profile
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit = {e => onSubmit(e)}>
          <div className="form-group">
            <select name="status" value = {status} onChange = {e => onChange(e)}>
              <option value="0">* Select Citizen Status</option>
              <option value="Convict">Convict</option>
              <option value="Vigilante">Vigilante</option>
              <option value="Police Officer">Police Officer</option>
              <option value="Politician">Politician</option>
              <option value="Ex-Convict">Ex-Convict</option>
              <option value="Citizen">Citizen</option>
              <option value="Other">Other</option>
            </select>
            <small className="form-text"
              >Give us an idea about your citizenship</small
            >
          </div>
          <div className="form-group">
            <input type="text" placeholder="Company" name="company" value = {company} onChange = {e => onChange(e)}/>
            <small className="form-text"
              >Could be your own company or one you work for</small
            >
          </div>
          <div className="form-group">
            <input type="text" placeholder="Photo" name="photo" value = {photo} onChange = {e => onChange(e)}/>
            <small className="form-text"
              >Please paste a link to your profile photo</small
            >
          </div>
          <div className="form-group">
            <input type="text" placeholder="Location" name="location" value = {location} onChange = {e => onChange(e)}/>
            <small className="form-text"
              >City & state suggested (eg. Gotham, Metropolis)</small
            >
          </div>
          <div className="form-group">
            <input type="text" placeholder="* Likes" name="likings" value = {likings} onChange = {e => onChange(e)}/>
            <small className="form-text"
              >Please use comma separated values for the things you like</small
            >
          </div>
          <div className="form-group">
            <textarea placeholder="A short bio of yourself" name="bio" value = {bio} onChange = {e => onChange(e)}></textarea>
            <small className="form-text">Tell us a little about yourself</small>
          </div>

          <div className="my-2">
            <button onClick = {() => toggleSocialValue(!showSocials)} type="button" className="btn btn-light">
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>

          {showSocials && (<Fragment>
              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input type="text" placeholder="Facebook URL" name="facebook" value = {facebook} onChange = {e => onChange(e)}/>
              </div>

              <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input type="text" placeholder="Linkedin URL" name="linkedin" value = {linkedin} onChange = {e => onChange(e)}/>
              </div>

              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input type="text" placeholder="Instagram URL" name="instagram" value = {instagram} onChange = {e => onChange(e)}/>
              </div>
            </Fragment>)}

          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
        </form>
      </Fragment>
  )
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, {createProfile})(CreateProfile);
