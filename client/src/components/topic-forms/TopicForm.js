import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { addTopic } from '../../actions/group';
import { connect } from 'react-redux';

const TopicForm = ({ cancel, group, history, addTopic }) => {
  const [formData, setFormData] = useState({
    title: '',
    text: ''
  });

  const editorOptions = {
    options: ['inline', 'fontSize', 'list', 'colorPicker', 'link', 'emoji'],
    inline: { options: ['bold', 'italic', 'strikethrough'] },
  }

  const { title } = formData;

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),);

  const handleEditorChange = (state) => {
    setEditorState(state);
  }

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  
  const onSubmit = e => {
    e.preventDefault();
    const htmlText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const data = {text: htmlText, title}
    addTopic(group._id, data, history);
    cancel();
  }
  
  return (
    <form className="form" onSubmit={e => onSubmit(e)}>
      <div className="form-group">
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Enter a title"
          onChange={e => onChange(e)}
        />
        <small className='form-text'>
          Give your topic a short title
        </small>
      </div>
      <div className="form-group">
        <Editor
          toolbar={editorOptions}
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        />
        <small className='form-text'>
          Tell us what your goals are for this topic
        </small>
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
