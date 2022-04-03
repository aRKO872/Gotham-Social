import React from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom"

const ProfileItems = ({
  profile : {
    user : { _id, name },
    status,
    company,
    location,
    photo,
    likings
  }
}) => {
    return <div className="profile bg-light">
      <img src={photo} alt="No Profile Photo" className="round-img"/>
      <div>
        <h2>{name}</h2>
        <p>{status} {company && <span> {company === "Self-Employed" ? "is" : "working at"} {company}</span>}</p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to = {`/profile/${_id}`} className="btn btn-primary">
          View Citizen Profile
        </Link>
      </div>
      <ul>
        {likings.slice(0,4).map((liking, index) => (
          <li key = {index} className="text-primary">
            <i className="fas fa-check"></i> {liking}
          </li>
        ))}
      </ul>
    </div>
}

ProfileItems.propTypes = {

}

export default ProfileItems;
