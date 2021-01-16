import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Profiles.css';

const ProfileItem = ({ profile: {
  user: { _id, name },
  website,
  avatar,
  bio,
  location,
  skills
}}) => {
  return (
    <div className="profile bg-light">
      <Link to={`/profile/${_id}`}>
        {avatar ?
          <img src={avatar} alt="" className="round-img" /> :
          <img src={`https://tribly.s3-us-west-1.amazonaws.com/avatar_default.png`} alt="avatar" />
        }
      </Link>
      <div>
        <h2>{name}</h2>
        {website &&
          <p>
            <a href={website} target='_blank' rel="noopener noreferrer">
            <i className="fas fa-globe fa"></i> Website
            </a>
          </p>
        }
        {bio && <p>{bio}</p>}
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {skills.length > 0 && <h2>Skills</h2>}
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileItem
