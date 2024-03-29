import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({ profile: {
  location,
  website,
  social,
  avatar,
  user: { name }
} }) => {
  
  const profileImg = avatar || 'https://tribly.s3-us-west-1.amazonaws.com/avatar_default.png'
  return (
    <div className="profile-top bg-dark p-2">
      <div className="profile-img-container">
        <img
          // className="round-img my-1"
          src={profileImg}
          alt=""
        />
      </div>
      <div>
        <h1 className="large">{name}</h1>
        <p>{location && <span>{location}</span>}</p>
        <div className="icons my-1">
          {website && 
            <a href={website} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe fa-2x"></i>
            </a>
          }
          {social && social.twitter &&
            <a href={social.twitter} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
          }
          {social && social.facebook &&
            <a href={social.facebook} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
          }
          {social && social.linkedin &&
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          }
          {social && social.youtube &&
            <a href={social.youtube} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube fa-2x"></i>
            </a>
          }
          {social && social.instagram &&
            <a href={social.instagram} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          }
        </div>
      </div>
    </div>
  )
}

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileTop
