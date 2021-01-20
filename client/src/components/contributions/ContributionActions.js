import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import ContributionForm from '../contribution-forms/ContributionForm';
import CommentForm from '../comment-forms/CommentForm';

const ContributionActions = ({ group, topic, history }) => {
  const [showContributionForm, setShowContributionForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const toggleContribution = () => {
    setShowContributionForm(!showContributionForm);
    setShowCommentForm(false);
  }
  
  const toggleComment = () => {
    setShowCommentForm(!showCommentForm);
    setShowContributionForm(false);
  }
  
  return (
    <Fragment>
      <div className="mb-1">
        <div className="btn btn-light" onClick={toggleContribution}>
          <i className="fas fa-photo-video text-primary"></i> Contribute
        </div>
        <div className="btn btn-light" onClick={toggleComment}>
          <i className="far fa-comment-dots text-primary"></i> Comment
        </div>
      </div>
      {
        showContributionForm && <ContributionForm group={group} cancel={toggleContribution} history={history} topic={topic} />
      }
      {
        showCommentForm && <CommentForm group={group} cancel={toggleComment} history={history} topic={topic} />
      }
    </Fragment>
  )
}

ContributionActions.propTypes = {
  group: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default ContributionActions
