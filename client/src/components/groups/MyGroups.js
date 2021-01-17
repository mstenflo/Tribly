import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GroupItem from './GroupItem'

const MyGroups = ({ groups }) => {
  return (
    <div>
      <h1 className="text-primary">My Groups</h1>
      {
        groups.map(group => (
          <GroupItem key={group._id} group={group} mygroup={true} />
        ))
      }
    </div>
  )
}

MyGroups.propTypes = {

}

export default MyGroups;
