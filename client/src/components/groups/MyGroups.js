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
          <div key={group.id}>
            <p>{group.id}</p>
          <GroupItem groupId={group.id} mygroup={true} />
          </div>
        ))
      }
    </div>
  )
}

MyGroups.propTypes = {

}

export default MyGroups;
