import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <Fragment>
      <img src={spinner} className='spinner' alt='Loading...' />
    </Fragment>
  );
};

export default Spinner;
