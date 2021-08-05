import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { connect } from 'react-redux';
import { addComment } from '../../actions/group';

const CommentForm = ({ addComment, cancel, group, topic = {} }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const editorOptions = {
    options: ['inline', 'fontSize', 'list', 'colorPicker', 'link', 'emoji'],
    inline: { options: ['bold', 'italic', 'strikethrough'] },
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const htmlText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    addComment(group, topic, htmlText);
    cancel();
  };

  return (
    <form className='form' onSubmit={(e) => onSubmit(e)}>
      <div className='from-group'>
        <Editor
          toolbar={editorOptions}
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName='wrapper-class'
          editorClassName='editor-class'
          toolbarClassName='toolbar-class'
        />
      </div>
      <input type='submit' className='btn btn-primary' />
      <div className='btn btn-light my-1' onClick={() => cancel()}>
        Cancel
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  topic: PropTypes.object,
};

export default connect(null, { addComment })(CommentForm);
