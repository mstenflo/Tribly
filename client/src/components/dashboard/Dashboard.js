import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';

const Dashboard = ({
  getCurrentProfile,
  auth,
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  console.log(profile)
  return (
    <Fragment>
      {loading && profile === null ? (
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
          </Fragment>
        )
      }
    </Fragment>
    )
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
