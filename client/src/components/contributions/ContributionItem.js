import React from 'react'
import PropTypes from 'prop-types'

const ContributionItem = ({ contribution: { title, text, file, author, filetype, link } }) => {
  return (
    <div>
      <h1 className="text-primary">{title}</h1>
      <h3>{author.name}</h3>
      <p>{text}</p>
      {
        filetype && filetype === 'image/*' && 
        <div className="contribution-image-container">
          <img src={file} alt="image" />
        </div>
      }
      {
        filetype && filetype === 'link' &&
        <a href={link} className="btn btn-primary">Link</a>
      }
    </div>
  )
}

ContributionItem.propTypes = {
  contribution: PropTypes.object.isRequired,
}

export default ContributionItem
