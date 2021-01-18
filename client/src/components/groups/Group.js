import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { getGroup } from '../../actions/group';
import { connect } from 'react-redux';

const Group = ({ match, getGroup, group: { group } }) => {
  useEffect(() => {
    getGroup(match.params.id);
  }, [getGroup, match.params.id]);

  return (
    group ? 
      <div>
        <h1 className="large text-primary">{group.name}</h1>
        <p>{group.description}</p>
      </div> : <p>No Groups found</p>
  )
}

Group.propTypes = {
  getGroup: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  group: state.group
})

export default connect(mapStateToProps, { getGroup })(Group);
