import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TopicItem from './TopicItem';

const Topics = ({ group: { topics, _id } }) => {
  return (
    <Fragment>
      {topics && topics.length > 0 && (
        <div>
          <h3>Topics</h3>
          {topics.map((topic) => (
            <span key={topic._id}>
              <TopicItem groupId={_id} topic={topic} key={topic._id} />
            </span>
          ))}
        </div>
      )}
    </Fragment>
  );
};

Topics.propTypes = {};

export default Topics;
