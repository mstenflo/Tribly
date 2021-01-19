import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import CommentItem from './CommentItem'

const Comments = ({ comments }) => {
  return (
    <Fragment>
      {
        comments && comments.length > 0 ? <div>
          <h3>Comments</h3>
          {
            comments.map(comment => (
              <div key={comment._id}>
                <CommentItem comment={comment} />
              </div>
            ))
          }
        </div> : null
      }
    </Fragment>
  )
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
}

export default Comments
