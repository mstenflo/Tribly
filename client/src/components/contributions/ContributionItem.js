import React from 'react'
import PropTypes from 'prop-types'

const ContributionItem = ({ contribution: { text, file, author } }) => {
  return (
    <div>
      {text} by {author.name}
    </div>
  )
}

ContributionItem.propTypes = {

}

export default ContributionItem
