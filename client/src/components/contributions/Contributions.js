import React from 'react';
import PropTypes from 'prop-types';
import ContributionItem from './ContributionItem';

const Contributions = ({ contributions }) => {
  const rev = [...contributions].reverse();
  return (
    <div>
      {rev && <h1 className='mb-1'>Contributions</h1> &&
        rev.map((contribution) => (
          <div key={contribution._id} className='comment-box p-1 bg-light'>
            <ContributionItem
              contribution={contribution}
              key={contribution._id}
            />
          </div>
        ))}
    </div>
  );
};

Contributions.propTypes = {
  contributions: PropTypes.array.isRequired,
};

export default Contributions;
