import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Topics = ({ topics }) => {
  return (
    <Fragment>
      {
        topics && topics.length > 0 && <div>
          <h3>Topics</h3>
        </div>
      }
    </Fragment>
  )
}

Topics.propTypes = {
  
}

export default Topics
