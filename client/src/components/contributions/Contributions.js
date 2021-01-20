import React from 'react'
import PropTypes from 'prop-types'
import ContributionItem from './ContributionItem'

const Contributions = ({ contributions }) => {
  return (
    <div>
      {
        contributions && contributions.map(contribution => (
          <ContributionItem key={contribution._id} contribution={contribution} />
        ))
      }
    </div>
  )
}

Contributions.propTypes = {

}

export default Contributions
