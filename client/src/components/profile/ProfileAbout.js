import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({ profile: {
  bio,
  skills,
  user: { name }
} }) => {
  if (!bio && skills.length === 0) return null;
  
  return (
    <div className="profile-about bg-light p-2">
      {bio && 
        <Fragment>
          <p>{bio}</p>
          <div className="line"></div>
        </Fragment>
      }
      {skills.length > 0 && <div>
        <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {skills.map((skill, index) => (
          <div className="p-1" key={index}>
            <i className="fas fa-check"></i> {skill}
          </div>
        ))}
      </div></div>}
    </div>
  )
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileAbout
