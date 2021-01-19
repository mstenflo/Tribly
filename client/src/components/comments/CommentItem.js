import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';

const CommentItem = ({ comment: { name, avatar, date, text, author }}) => {
  return (
    <Fragment>
      <div className="comment-box bg-light">
        <div className="comment-info">
          <img src={avatar} className="round-img m avatar-sm" alt=""/>
          <div className="comment-name">
            <Link to={`/profile/${author}`}>
              {name}
            </Link>
            <Moment className="date" fromNow>
              {date}
            </Moment>
          </div>
        </div>
        <p className="m">{text}</p>
      </div>
    </Fragment>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
}

export default CommentItem