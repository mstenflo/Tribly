import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { addTopic } from '../../actions/group';
import { connect } from 'react-redux';

const TopicForm = ({ cancel, group, history, addTopic }) => {
  const [formData, setFormData] = useState({
    title: '',
    text: ''
  });

  const { title, text } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  
  const onSubmit = e => {
    e.preventDefault();
    addTopic(group._id, formData, history);
    cancel();
    setFormData({
      title: '',
      text: ''
    })
  }
  
  return (
    <form className="form" onSubmit={e => onSubmit(e)}>
      <div className="form-group">
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Enter a title for your topic"
          onChange={e => onChange(e)}
        />
      </div>
      <div className="form-group">
        <textarea 
          name="text"
          value={text}
          placeholder="Add some more information about this topic"
          onChange={e => onChange(e)}
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
  addTopic: PropTypes.func.isRequired,
}

export default connect(null, { addTopic })(TopicForm);
