import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getGroups } from '../../actions/group'
import { getCurrentProfile } from '../../actions/profile'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import GroupItem from './GroupItem'

const Groups = ({
  getGroups,
  getCurrentProfile,
  profile: { profile },
  group: { loading, groups },
  history
}) => {
  useEffect(() => {
    getGroups();
    getCurrentProfile();
  }, [getGroups, getCurrentProfile]);
  
  return (
    <Fragment>
      {
        loading ? <Spinner /> :
          <Fragment>
            <h1 className="large text-primary">Groups</h1>
            <p className="lead">Browse and join groups</p>
            <div className="groups">
              {
                groups.length > 0 ? 
                  groups.map(group => (
                    <GroupItem profile={profile} key={group._id} group={group} history={history} />
                  )) : <h4>No Groups found</h4>
              }
            </div>
          </Fragment>
      }
    </Fragment>
  )
}

Groups.propTypes = {
  getGroups: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  group: state.group,
})

export default connect(mapStateToProps, { getGroups, getCurrentProfile })(Groups);
