import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Group.css';

const GroupItem = ({ group: { name, description } }) => {
  return (
    <div className="group bg-light">
      <div>
        <h2>{name}</h2>
        <p>{description}</p>
        <Link to='/' className="btn btn-primary">Join Group</Link>
      </div>
    </div>
  )
}

GroupItem.propTypes = {
  group: PropTypes.object.isRequired,
}

export default GroupItem
