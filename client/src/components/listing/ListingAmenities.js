import React from 'react';
import PropTypes from 'prop-types';

const ListingAmenities = ({ amenities }) => {
  return (
    <div className='border-b border-secondary-100 md:border-b-0 pb-6 md:pb-0'>
      <h2 className='text-xl font-semibold mb-3'>Amenities</h2>
      {amenities.map((amenity, index) => (
        <span
          key={index}
          className='badge text-gray-50 bg-secondary-300 inline-block mr-3 mb-2'
        >
          {amenity}
        </span>
      ))}
    </div>
  );
};

ListingAmenities.propTypes = {
  amenities: PropTypes.array.isRequired,
};

export default ListingAmenities;
