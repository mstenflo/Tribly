import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import CommentForm from '../comment-forms/CommentForm';
import TopicForm from '../topic-forms/TopicForm';

const GroupActions = ({ group, history }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showTopicForm, setShowTopicForm] = useState(false);

  const toggleTopic = () => {
    setShowTopicForm(!showTopicForm);
    setShowCommentForm(false);
  }

  const toggleComment = () => {
    setShowCommentForm(!showCommentForm);
    setShowTopicForm(false);
  }

  return (
    <Fragment>
      <div className="mb-1">
        <div className="btn btn-light" onClick={toggleComment}>
          <i className="far fa-comment-dots text-primary"></i> Add Comment
        </div>
        <div className="btn btn-light" onClick={toggleTopic}>
          <i className="fas fa-plus-circle text-primary"></i> Create Topic
        </div>
      </div>
      {
        showTopicForm && <TopicForm group={group} cancel={toggleTopic} history={history} />
      }
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
