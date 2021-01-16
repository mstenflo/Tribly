import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { createGroup } from '../../actions/group';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const GroupForm = ({ createGroup, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const { name, description } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
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
          <input type="text" placeholder="description" name="description" value={description} onChange={e => onChange(e)} />
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
