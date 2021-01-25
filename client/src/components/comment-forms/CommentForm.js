import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
// import { convertToHTML } from 'draft-convert';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { connect } from 'react-redux';
import { addComment } from '../../actions/group';

const CommentForm = ({ addComment, cancel, group, history }) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),);
  // const  [convertedContent, setConvertedContent] = useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
    // convertContentToHTML();
  }
  // const convertContentToHTML = () => {
  //   let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
  //   setConvertedContent(currentContentAsHTML);
  // }

  const onSubmit = e => {
    e.preventDefault();
    const htmlText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    addComment(group._id, htmlText, history);
    cancel();
  }

  return (
    <form className="form" onSubmit={e => onSubmit(e)}>
      <div className="from-group">
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
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
