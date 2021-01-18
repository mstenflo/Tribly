import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Group.css';

const GroupItem = ({ mygroup, group }) => {
  return (
    group ? 
      <div className="group bg-light">
        <div>
          <Link to={`/group/${group._id}`}>
            <h2>{group.name}</h2>
          </Link>
          <p>{group.description}</p>
        </div>
        {
          mygroup ? null : 
          <Link to='/' className="btn btn-primary">Join Group</Link>
        }
      </div> : null
  )
}

GroupItem.propTypes = {
  group: PropTypes.object.isRequired,
  mygroup: PropTypes.bool.isRequired,
}

export default GroupItem
