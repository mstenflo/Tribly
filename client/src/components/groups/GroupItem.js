import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import { joinGroup } from '../../actions/profile';
import { connect } from 'react-redux';

const GroupItem = ({ group, profile, joinGroup, history }) => {
  const id = group.id || group._id;

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return group ? (
    <div className='group bg-light'>
      <div style={{ width: '100%' }}>
        <div className='flexit'>
          <Link to={`/group/${id}`}>
            <h2>{group.name}</h2>
          </Link>
          {profile &&
            profile.groups &&
            profile.groups.filter((grp) => grp._id === id).length === 0 && (
              <div
                onClick={() => joinGroup(group, profile, history)}
                className='btn btn-primary'
              >
                Join
              </div>
            )}
        </div>
        <div dangerouslySetInnerHTML={createMarkup(group.description)}></div>
      </div>
    </div>
  ) : null;
};

GroupItem.propTypes = {
  group: PropTypes.object.isRequired,
  profile: PropTypes.object,
  joinGroup: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(null, { joinGroup })(GroupItem);
