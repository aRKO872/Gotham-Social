import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({ profile : {
  bio,
  likings,
  status,
  user : {name}
}}) => {
    return (
      <div className="profile-about bg-light p-2">
        {bio && (
          <Fragment>
            <h2 className='text-primary'>{name.trim().split(' ')[0]}'s Bio</h2>
            <p>{bio}</p>
            <div className='line' />
          </Fragment>
        )}
        <h2 className="text-primary">Likes</h2>
        <div className='skills'>
          {likings.map((like, index) => (
            <div key={index} className='p-1'>
              <i className='fas fa-check' /> {like}
            </div>
          ))}
        </div>
        <div class="line"></div>
        <div>
          <p><h1><strong>{status}</strong></h1></p>
        </div>
      </div>
    )
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileAbout;
