import React, { useState } from 'react'
import PropTypes from 'prop-types'
import S3FileUpload from 'react-s3';
import S3Config from '../../config';
import { addContribution } from '../../actions/group';
import { connect } from 'react-redux';

const ContributionForm = ({ group, cancel, history, topic, addContribution }) => {
  
  const [formData, setFormData] = useState({
    text: '',
    file: '',
    groupId: group._id,
    topicId: topic._id
  });

  const [loadingFile, setLoadingFile] = useState(false);

  const { text, file } = formData;

  const config = {
    bucketName: S3Config.S3Bucket,
    region: S3Config.S3Region,
    accessKeyId: S3Config.S3AccessKeyID,
    secretAccessKey: S3Config.S3SecretAccessKey
  }

  const onSubmit = e => {
    e.preventDefault();
    addContribution(group._id, topic._id, formData, history);
    cancel();
  }

  const onChange = (e) => {
    if (e.target.files) {
      S3FileUpload.uploadFile(e.target.files[0], config, { mode: 'no-cors' })
        .then(data => {
          setFormData({ ...formData, file: data.location });
        })
        .catch(err => {
          alert(err);
        });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  return (
    <form className="form" onSubmit={e => onSubmit(e)}>
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
      <div className="form-group" onClick={() => setLoadingFile(true)}>
        <input
          type="file"
          name="file"
          id="file"
          accept="audio/*, video/*, image/*"
          onChange={e => onChange(e)}
        />
      </div>
      <input type="submit" className="btn btn-primary" />
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
