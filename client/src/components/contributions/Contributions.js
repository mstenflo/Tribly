import React from 'react'
import PropTypes from 'prop-types'
import ContributionItem from './ContributionItem'

const Contributions = ({ contributions }) => {
  const rev = [...contributions].reverse()
  return (
    <div>
      {
        contributions && <h1 className="mb-1">Contributions</h1>
      }
      {
        rev && rev.map(contribution => (
          <div key={contribution._id} className="comment-box p-1 bg-light">
            <ContributionItem contribution={contribution} key={contribution._id} />
          </div>
        ))
      }
    </div>
  )
}

Contributions.propTypes = {

}

export default Contributions
