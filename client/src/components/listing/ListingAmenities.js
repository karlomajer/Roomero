import React from 'react';
import PropTypes from 'prop-types';

const ListingAmenities = ({ amenities }) => {
  return (
    <div>
      <h2 className='text-xl font-semibold mb-3'>Amenities</h2>
      {amenities.map((amenity, index) => (
        <span
          key={index}
          className='badge badge-secondary inline-block mr-3 mb-2'
        >
          {amenity}
        </span>
      ))}
    </div>
  );
};

ListingAmenities.propTypes = {
  amenities: PropTypes.array.isRequired
};

export default ListingAmenities;
