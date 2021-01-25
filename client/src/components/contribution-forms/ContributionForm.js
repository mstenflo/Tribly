import React, { useState } from 'react'
import PropTypes from 'prop-types'
import S3FileUpload from 'react-s3';
import { addContribution } from '../../actions/group';
import { connect } from 'react-redux';

const ContributionForm = ({ group, cancel, history, topic, addContribution }) => {
  
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    file: '',
    filetype: '',
    groupId: group._id,
    topicId: topic._id
  });
  const [loadingFile, setLoadingFile] = useState(false);

  const { title, text, file, filetype } = formData;

  const config = {
    bucketName: process.env.S3Bucket,
    region: process.env.S3Region,
    accessKeyId: process.env.S3AccessKeyID,
    secretAccessKey: process.env.S3SecretAccessKey
  }

  const onSubmit = e => {
    e.preventDefault();
    addContribution(group._id, topic._id, formData, history);
    cancel();
  }

  const onChange = e => {
    if (e.target.files) {
      S3FileUpload.uploadFile(e.target.files[0], config, { mode: 'no-cors' })
        .then(data => {
          setFormData({ ...formData, file: data.location });
        })
        .catch(err => {
          alert(err);
        });
    } else {
      setLoadingFile(false);
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  return (
    <form className="form" onSubmit={e => onSubmit(e)}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Enter a title"
          name="title"
          value={title}
          onChange={e => onChange(e)}
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Tell us about your contribution"
          rows="5"
          name="text"
          value={text}
          onChange={e => onChange(e)}
        />
      </div>
      {
        loadingFile ? <div>
          {
            file ? <h1>File has been uploaded, you can submit your contribution</h1> :
              <h1>File has not finished uploading, do not submit yet...</h1>
          }
        </div> : null
      }
      <div className="form-group">
        <select name="filetype" onChange={e => onChange(e)} defaultValue="">
          <option value="" disabled>-- Select File Type --</option>
          <option value="image/*">Image</option>
          <option value="video/*">Video</option>
          <option value="audio/*">Audio</option>
          <option value="youtube">Youtube Link</option>
          <option value="link">Web Link</option>
        </select>
      </div>
      <div className="form-group">
        {
          (filetype === 'image/*' || filetype === 'video/*' || filetype === 'audio/*') &&
            <input
              onClick={() => setLoadingFile(true)}
              type="file"
              name="file"
              accept="image/*, video/*, audio/*"
              onChange={e => onChange(e)}
            />
        }
        {
          filetype === 'link' &&
          <input
            type="text"
            placeholder="Enter the link"
            name={filetype}
            onChange={e => onChange(e)}
          />
        }
        {
          filetype === 'youtube' &&
          <input
            type="text"
            placeholder="Enter the videoId (not the entire link)"
            name={filetype}
            onChange={e => onChange(e)}
          />
        }
      </div>
      {
        !loadingFile ? <input type="submit" className="btn btn-primary" /> : null
      }
      <div className="btn btn-light" onClick={() => cancel()}>Cancel</div>
      <div className="mb-1"></div>
    </form>
  )
}

ContributionForm.propTypes = {
  group: PropTypes.object.isRequired,
  cancel: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  addContribution: PropTypes.func.isRequired,
}

export default connect(null, { addContribution })(ContributionForm);
