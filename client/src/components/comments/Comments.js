import React from 'react'
import PropTypes from 'prop-types'
import CommentItem from './CommentItem'

const Comments = ({ comments }) => {
  return (
    comments && comments.map(comment => (
      <div key={comment._id}>
        <CommentItem comment={comment} />
      </div>
    ))
  )
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
}

export default Comments
