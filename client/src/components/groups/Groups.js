import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getGroups } from '../../actions/group'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import GroupItem from './GroupItem'

const Groups = ({ getGroups, group: { loading, groups } }) => {
  useEffect(() => {
    getGroups();
  }, [getGroups]);

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
                    <GroupItem key={group._id} group={group} mygroup={true} />
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
  group: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  group: state.group
})

export default connect(mapStateToProps, { getGroups })(Groups);
