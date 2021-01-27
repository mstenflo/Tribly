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
  addContribution: PropTypes.func.isRequired,
}

export default connect(null, { addContribution })(ContributionForm);
