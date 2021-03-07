import React from 'react';
import PropTypes from 'prop-types';

const ListingTopInfo = ({ listing }) => {
  return (
    <div className='flex-grow w-full pt-1'>
      <h1
        style={{ marginBottom: '-7px' }}
        className='text-3xl md:text-2xl lg:text-3xl inline-block font-semibold leading-snug'
      >
        {listing.title}
      </h1>
      <p className='mb-3 text-gray-600'>{listing.location.join(', ')}</p>
      <span className='inline-block mr-4 md:mr-8 text-gray-400'>
        {listing.propertyType}
      </span>
      <span className='inline-block mr-4 md:mr-8 text-gray-400'>
        {listing.maxGuests > 1
          ? `${listing.maxGuests} Guests`
          : `${listing.maxGuests} Guest`}
      </span>
      <span className='inline-block mr-8 text-gray-400'>
        {listing.bathroomCount > 1
          ? `${listing.bathroomCount} Bathrooms`
          : `${listing.bathroomCount} Bathroom`}
      </span>
    </div>
  );
};

ListingTopInfo.propTypes = {
  listing: PropTypes.object.isRequired,
};

export default ListingTopInfo;
