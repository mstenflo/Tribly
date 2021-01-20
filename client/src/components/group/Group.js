import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { getGroup } from '../../actions/group';
import { connect } from 'react-redux';
import GroupActions from './GroupActions';
import Comments from '../comments/Comments';
import Topics from '../topics/Topics';

const Group = ({ match, getGroup, group: { group }, history }) => {
  useEffect(() => {
    getGroup(match.params.id);
  }, [getGroup, match.params.id]);
  
  return (
    group ? 
      <div>
        <h1 className="large text-primary">{group.name}</h1>
        <p className="mb-1">{group.description}</p>
        <GroupActions group={group} history={history} />
        <Topics group={group} />
        <div className="mb-1"></div>
        <Comments comments={group.comments} />
      </div> : <p>No Group found</p>
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
