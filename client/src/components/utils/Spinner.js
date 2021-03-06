import React from 'react';
import { ReactComponent as SpinnerIcon } from '../../img/spinner.svg';

const Spinner = ({ className }) => {
  return (
    <div className={['w-full flex justify-center', className].join(' ')}>
      <SpinnerIcon />
    </div>
  );
};

export default Spinner;
