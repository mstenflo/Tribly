import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import DOMPurify from 'dompurify';
import { getGroup, getTopicData } from '../../actions/group'
import { getContributions } from '../../actions/contribution';
import { connect } from 'react-redux'
import ContributionActions from '../contributions/ContributionActions'
import Contributions from '../contributions/Contributions';
import Comments from '../comments/Comments';
import { Link } from 'react-router-dom';

const Topic = ({
  topic: { topic },
  getGroup,
  getTopicData,
  getContributions,
  match,
  group: { group },
  history,
  contribution: { contributions }
}) => {
  useEffect(() => {
    getContributions(match.params.topicId);
    getGroup(match.params.id);
    getTopicData(match.params.id, match.params.topicId)
  }, [getGroup, match.params.id, match.params.topicId]);

  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

  return group && topic ?
    <div>
      <Link to={`/group/${group._id}`}>
        <h1 className="large text-primary">{group.name}</h1>
      </Link>
      <h1>{topic.title}</h1>
      <div className="mb-1" dangerouslySetInnerHTML={createMarkup(topic.text)}></div>
      <div className="mb-1"></div>
      <ContributionActions group={group} topic={topic} history={history} />
      <Contributions contributions={contributions} />
      <Comments comments={topic.comments} />
    </div> : <h1>Topic not found</h1>
}

Topic.propTypes = {
  getGroup: PropTypes.func.isRequired,
  getContributions: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  contribution: PropTypes.object.isRequired,
  getTopicData: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  group: state.group,
  contribution: state.contribution,
  topic: state.topic
})

export default connect(mapStateToProps, { getGroup, getContributions, getTopicData })(Topic)
