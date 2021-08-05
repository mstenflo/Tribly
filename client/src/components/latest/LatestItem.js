import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LatestItem = ({ item: { data, type } }) => {
  return (
    <div>
      {type === 'profile' && (
        <p>
          <Link to={`/profile/${data.user}`}>{data.name}</Link> updated their
          profile
        </p>
      )}
      {type === 'newgroup' && data.admin.name && (
        <p>
          <Link to={`/profile/${data.admin.id}`}>{data.admin.name}</Link>{' '}
          created the group <Link to={`/group/${data._id}`}>{data.name}</Link>
        </p>
      )}
      {type === 'joingroup' && (
        <p>
          <Link to={`/profile/${data.profile.user}`}>{data.profile.name}</Link>{' '}
          joined <Link to={`/group/${data.group._id}`}>{data.group.name}</Link>
        </p>
      )}
      {type === 'contribution' && (
        <p>
          <Link to={`/profile/${data.author.id}`}>{data.author.name}</Link>{' '}
          commented on
          <Link to={`/group/${data.group.id}/topic/${data.topic.id}`}>
            {' '}
            &nbsp;
            {data.topic.title}
          </Link>{' '}
          in <Link to={`/group/${data.group.id}`}>{data.group.name}</Link>
        </p>
      )}
      {type === 'topiccomment' && (
        <p>
          <Link to={`/profile/${data.comment.author.id}`}>
            {data.comment.author.name}
          </Link>{' '}
          commented on
          <Link to={`/group/${data.group._id}/topic/${data.topic._id}`}>
            {' '}
            &nbsp;
            {data.topic.title}
          </Link>{' '}
          in <Link to={`/group/${data.group._id}`}>{data.group.name}</Link>
        </p>
      )}
      {type === 'groupcomment' && (
        <p>
          <Link to={`/profile/${data.comment.author.id}`}>
            {data.comment.author.name}
          </Link>{' '}
          commented in{' '}
          <Link to={`/group/${data.group._id}`}>{data.group.name}</Link>
        </p>
      )}
      {type === 'newtopic' && (
        <p>
          <Link to={`/profile/${data.topic.author.id}`}>
            {data.topic.author.name}
          </Link>{' '}
          created the topic
          <Link to={`/group/${data.group._id}/topic/${data.topic._id}`}>
            {' '}
            &nbsp;
            {data.topic.title}
          </Link>{' '}
          in the group{' '}
          <Link to={`/group/${data.group._id}`}>{data.group.name}</Link>
        </p>
      )}
    </div>
  );
};

LatestItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default LatestItem;
