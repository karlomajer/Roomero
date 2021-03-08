import React from 'react';
import { ReactComponent as SpinnerIcon } from '../../img/spinner.svg';
import PropTypes from 'prop-types';

const Spinner = ({ className }) => {
  return (
    <div className={['w-full flex justify-center', className].join(' ')}>
      <SpinnerIcon />
    </div>
  );
};

Spinner.propTypes = {
  className: PropTypes.string,
};

export default Spinner;
