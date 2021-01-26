import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import DOMPurify from 'dompurify';
import { getGroup } from '../../actions/group'
import { connect } from 'react-redux'
import ContributionActions from '../contributions/ContributionActions'
import Contributions from '../contributions/Contributions'

const Topic = ({ getGroup, match, group: { group }, history }) => {
  useEffect(() => {
    getGroup(match.params.id)
  }, [getGroup, match.params.id]);

  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }
  
  const getTopic = id => {
    if (!group) return null;
    return group.topics.filter(topic => topic._id === id)[0]
  }
  
  const topic = getTopic(match.params.topicId)
  
  return group && topic ?
    <div>
      <h1 className="large text-primary">{group.name}</h1>
      <h1>{topic.title}</h1>
      <div className="mb-1" dangerouslySetInnerHTML={createMarkup(topic.text)}></div>
      <div className="mb-1"></div>
      <ContributionActions group={group} topic={topic} history={history} />
      <Contributions contributions={topic.contributions} />
    </div> : <h1>Topic not found</h1>
}

Topic.propTypes = {
  getGroup: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  group: state.group
})

export default connect(mapStateToProps, { getGroup })(Topic)
