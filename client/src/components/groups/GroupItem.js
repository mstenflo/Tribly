import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const GroupItem = ({ group }) => {
  const id = group.id || group._id
  
  return (
    group ? 
      <div className="group bg-light">
        <div>
          <Link to={`/group/${id}`}>
            <h2>{group.name}</h2>
          </Link>
          <p>{group.description}</p>
        </div>
      </div> : null
  )
}

GroupItem.propTypes = {
  group: PropTypes.object.isRequired,
}

export default GroupItem
