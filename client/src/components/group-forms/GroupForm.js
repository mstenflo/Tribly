import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { createGroup } from '../../actions/group';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const GroupForm = ({ createGroup, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),);
  const  [convertedContent, setConvertedContent] = useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  }
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }

  const { name, description } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    const htmlText = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    
    setFormData({ ...formData, description: htmlText });
    
    createGroup(formData, history)
  }
  
  return (
    <Fragment>
      <h1 className="large text-primary">Create Group</h1>
      <form onSubmit={e => onSubmit(e)} className="form">
        <div className="form-group">
          <input type="text" placeholder="name" name="name" value={name} onChange={e => onChange(e)} />
          <small className="form-text">Give your group a unique name</small>
        </div>
        <div className="form-group">
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
          />
          <small className="form-text">What are your objectives for this group</small>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link to="/dashboard" className="btn btn-light my-1">Go Back</Link>
      </form>
    </Fragment>
  )
}

GroupForm.propTypes = {
  createGroup: PropTypes.func.isRequired,
}

export default connect(null, { createGroup })(GroupForm);
