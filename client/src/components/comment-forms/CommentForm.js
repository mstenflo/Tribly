import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addComment } from '../../actions/group';

const CommentForm = ({ addComment, cancel, group, history }) => {
  const [comment, setComment] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    addComment(group._id, comment, history);
    cancel();
  }

  return (
    <form className="form" onSubmit={e => onSubmit(e)}>
      <div className="from-group">
        <textarea 
          placeholder="Enter your comment"
          name="comment"
          value={comment}
          rows="5"
          onChange={e => setComment(e.target.value)}
        />
      </div>
      <input type="submit" className="btn btn-primary" />
      <div className="btn btn-light my-1" onClick={() => cancel()}>Cancel</div>
    </form>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
}

export default connect(null, { addComment })(CommentForm)
