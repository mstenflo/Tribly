import React from 'react'
import PropTypes from 'prop-types'
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom'

const GroupItem = ({ group }) => {
  const id = group.id || group._id

  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }
  
  return (
    group ? 
      <div className="group bg-light">
        <div>
          <Link to={`/group/${id}`}>
            <h2>{group.name}</h2>
          </Link>
          <div dangerouslySetInnerHTML={createMarkup(group.description)}></div>
        </div>
      </div> : null
  )
}

GroupItem.propTypes = {
  group: PropTypes.object.isRequired,
}

export default GroupItem
