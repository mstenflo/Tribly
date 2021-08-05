import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <Fragment>
      <div className='mb-1'>
        <Link to='/edit-profile' className='btn btn-light'>
          <i className='fas fa-user-circle text-primary'></i> Edit Profile
        </Link>
        <Link to='/create-group' className='btn btn-light'>
          <i className='fas fa-plus-circle text-primary'></i> Create Group
        </Link>
        <Link to='/groups' className='btn btn-light'>
          <i className='fas fa-users text-primary'></i> Find Groups
        </Link>
      </div>
    </Fragment>
  );
};

export default DashboardActions;
