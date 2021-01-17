import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Group.css';

const GroupItem = ({ mygroup, group: { name, description, _id } }) => {
  return (
    <div className="group bg-light">
      <div>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
      {
        mygroup ? null : 
        <Link to='/' className="btn btn-primary">Join Group</Link>
      }
    </div>
  )
}

GroupItem.propTypes = {
  group: PropTypes.object.isRequired,
  mygroup: PropTypes.bool.isRequired,
}

export default GroupItem
