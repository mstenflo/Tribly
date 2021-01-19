import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const TopicForm = ({ cancel, group, history }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    cancel();
  }
  
  return (
    <form className="form" onSubmit={e => onSubmit(e)}>
      <div className="form-group">
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Enter a title for your topic"
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <textarea 
          name="text"
          value={text}
          placeholder="Add some more information about this topic"
          onChange={e => setText(e.target.value)}
          rows="5"
        />
      </div>
      <input type="submit" className="btn btn-primary" />
      <div className="btn btn-light my-1" onClick={() => cancel()}>Cancel</div>
    </form>
  )
}

TopicForm.propTypes = {
  cancel: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default TopicForm
