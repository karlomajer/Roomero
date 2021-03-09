import React from 'react';
import PropTypes from 'prop-types';

const ListingDescription = ({ description }) => {
  return (
    <div>
      <h2 className='text-xl font-semibold mb-2'>Description</h2>
      <p className='text-gray-400'>{description}</p>
    </div>
  );
};

ListingDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

export default ListingDescription;
