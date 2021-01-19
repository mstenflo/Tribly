import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import CommentForm from '../comment-forms/CommentForm';

const GroupActions = ({ group, history }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);

  const toggleComment = () => {
    setShowCommentForm(!showCommentForm);
  }

  return (
    <Fragment>
      <div className="mb-1">
        <div className="btn btn-light" onClick={toggleComment}>
          <i className="far fa-comment-dots text-primary"></i> Add Comment
        </div>
        <Link className="btn btn-light" to="/create-topic">
          <i className="fas fa-plus-circle text-primary"></i> Create Topic
        </Link>
      </div>
      {
        showCommentForm && <CommentForm group={group} cancel={toggleComment} history={history} /> 
      }
    </Fragment>
  )
}

GroupActions.propTypes = {
  group: PropTypes.object.isRequired,
}

export default GroupActions
