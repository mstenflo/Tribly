import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const TopicItem = ({ topic, groupId }) => {
  return (
    <Link to={`/group/${groupId}/topic/${topic._id}`} className="btn btn-primary">
      {topic.title}
    </Link>
  )
}

TopicItem.propTypes = {
  topic: PropTypes.object.isRequired,
}

export default TopicItem
