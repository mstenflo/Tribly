import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getLatest } from '../../actions/latest';
import { connect } from 'react-redux';
import LatestItem from './LatestItem';

const Latest = ({ getLatest, latest: { latest } }) => {
  useEffect(() => {
    getLatest();
  }, [getLatest]);

  return (
    <div>
      <h1 className='text-primary'>Latest News</h1>
      {latest &&
        latest.map((item) => <LatestItem item={item} key={item._id} />)}
    </div>
  );
};

Latest.propTypes = {
  getLatest: PropTypes.func.isRequired,
  latest: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  latest: state.latest,
});

export default connect(mapStateToProps, { getLatest })(Latest);
