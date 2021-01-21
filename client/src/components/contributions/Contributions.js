import React from 'react'
import PropTypes from 'prop-types'
import ContributionItem from './ContributionItem'

const Contributions = ({ contributions }) => {
  return (
    <div>
      {
        contributions && <h1 className="mb-1">Contributions</h1>
      }
      {
        contributions && contributions.map(contribution => (
          <div key={contribution._id}>
            <ContributionItem contribution={contribution} />
            <div className="line"></div>
          </div>
        ))
      }
    </div>
  )
}

Contributions.propTypes = {

}

export default Contributions
