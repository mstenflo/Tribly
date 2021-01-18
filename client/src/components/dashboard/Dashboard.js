import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import GroupItem from '../groups/GroupItem';

const Dashboard = ({
  getCurrentProfile,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
      <Fragment>
        {profile !== null ? (
          <Fragment>
            <DashboardActions />
          </Fragment>
        ) : (
            <Fragment>
              <p>You have not set up a profile, please add some info</p>
              <Link to='/create-profile' className="btn btn-primary my-1">
                Create Profile
          </Link>
            </Fragment>
          )}
        {
          profile && profile.groups && profile.groups.length > 0 ? 
              profile.groups.map(group => (
                <GroupItem key={group._id} group={group} mygroup={true} />
            )) :
            null
        }
      </Fragment>
    )
  }
      
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
