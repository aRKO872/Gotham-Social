import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({profile : {
  photo,
  social,
  location,
  company,
  status,
  user : {name}
}}) => {
    return (
      <div className="profile-top bg-primary p-2">
        <img
          className="round-img my-1"
          src={photo}
          alt="No Profile Photo Uploaded"
        />
        <h1 className="large">{name}</h1>
        {company && <p className="lead">{company === "Self-Employed" ? "Is" : "Working at"} {company}</p>}
        <p>{location && <span>{location}</span>}</p>
        <div className="icons my-1">
          {
            social && social.facebook && (
              <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                <i class="fab fa-facebook fa-2x"></i>
              </a>
            )
          }
          {
            social && social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                <i class="fab fa-linkedin fa-2x"></i>
              </a>
            )
          }
          {
            social && social.instagram && (
              <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                <i class="fab fa-instagram fa-2x"></i>
              </a>
            )
          }
        </div>
      </div>
    )
}

ProfileTop.propTypes = {
  profile : PropTypes.object.isRequired
}

export default ProfileTop;
