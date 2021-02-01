import React, { useState } from 'react'
import PropTypes from 'prop-types'
import S3FileUpload from 'react-s3';
import S3Config from '../../config';
import { addContribution } from '../../actions/contribution';
import { connect } from 'react-redux';

const ContributionForm = ({ group, cancel, topic, addContribution }) => {
  
  const [formData, setFormData] = useState({
    author: {},
    group: {
      id: group._id,
      name: group.name
    },
    topic: {
      id: topic._id,
      title: topic.title
    },
    title: '',
    text: '',
    link: '',
    youtube: '',
    file: '',
    filetype: ''
  });
  const [loadingFile, setLoadingFile] = useState(false);

  const { title, text, file, filetype } = formData;

  const config = {
    bucketName: S3Config.S3Bucket,
    region: S3Config.S3Region,
    accessKeyId: S3Config.S3AccessKeyID,
    secretAccessKey: S3Config.S3SecretAccessKey
  }

  const onSubmit = e => {
    e.preventDefault();
    addContribution(group._id, topic._id, formData);
    cancel();
  }

  const onChange = e => {
    if (e.target.files) {
      S3FileUpload.uploadFile(e.target.files[0], config)
      .then(data => {
        setFormData({ ...formData, file: data.location });
        setLoadingFile(false);
      })
      .catch(err => {
          alert(err);
        });
    } else {
      setLoadingFile(false);
      if (e.target.name === 'link') {
        const weblink = e.target.value.includes('http') ? e.target.value : 'http://' + e.target.value;
        setFormData({ ...formData, link: weblink });
      } else {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
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
        <small className='form-text'>
          Give your contribution a title
        </small>
      </div>
      <div className="form-group">
        <textarea
          placeholder="describe your contribution"
          rows="5"
          name="text"
          value={text}
          onChange={e => onChange(e)}
        />
        <small className='form-text'>
          Tell us something about your contribution
        </small>
      </div>
      {
        loadingFile ? <div>
          {
            file ? <h1>File has been uploaded, you can submit your contribution</h1> :
              <h1>File has not finished uploading, do not submit yet...</h1>
          }
        </div> : null
      }
      <h3>Upload or link a file</h3>
      <div className="form-group">
        <div className="btn btn-light" onClick={() => setFormData({ ...formData, filetype: 'image/*' })}>Image</div>
        <div className="btn btn-light" onClick={() => setFormData({ ...formData, filetype: 'video/*' })}>Video</div>
        <div className="btn btn-light" onClick={() => setFormData({ ...formData, filetype: 'audio/*' })}>Audio</div>
        <div className="btn btn-light" onClick={() => setFormData({ ...formData, filetype: 'youtube' })}>Youtube</div>
        <div className="btn btn-light" onClick={() => setFormData({ ...formData, filetype: 'link' })}>Link</div>
      </div>
      <div className="form-group">
        {
          filetype === 'image/*' &&
          <div style={{display: 'flex'}}>
            <input
              onClick={() => setLoadingFile(true)}
              type="file"
              name="file"
              accept={filetype}
              onChange={e => onChange(e)}
            />
            <p>Upload an Image</p>
          </div>
        }
        {
          filetype === 'video/*' &&
          <div style={{display: 'flex'}}>
            <input
              onClick={() => setLoadingFile(true)}
              type="file"
              name="file"
              accept={filetype}
              onChange={e => onChange(e)}
            />
            <p>Upload a Video</p>
          </div>
        }
        {
          filetype === 'audio/*' &&
          <div style={{display: 'flex'}}>
            <input
              onClick={() => setLoadingFile(true)}
              type="file"
              name="file"
              accept={filetype}
              onChange={e => onChange(e)}
            />
            <p>Upload an Audio file</p>
          </div>
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
            placeholder="Enter the id for the video (not the entire link)"
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
  addContribution: PropTypes.func.isRequired,
}

export default connect(null, { addContribution })(ContributionForm);
