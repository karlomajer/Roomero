import React from 'react';
import PropTypes from 'prop-types';

const ListingTopInfo = ({ listing }) => {
  return (
    <div className='flex-grow w-full pt-1'>
      <h1
        style={{ marginBottom: '-7px' }}
        className='text-3xl inline-block font-semibold'
      >
        {listing.title}
      </h1>
      <p className='mb-3'>{listing.location.join(', ')}</p>
      <span className='inline-block mr-4 md:mr-8'>{listing.propertyType}</span>
      <span className='inline-block mr-4 md:mr-8'>
        {listing.maxGuests > 1
          ? `${listing.maxGuests} Guests`
          : `${listing.maxGuests} Guest`}
      </span>
      <span className='inline-block mr-8'>
        {listing.bathroomCount > 1
          ? `${listing.bathroomCount} Bathrooms`
          : `${listing.bathroomCount} Bathroom`}
      </span>
    </div>
  );
};

ListingTopInfo.propTypes = {
  listing: PropTypes.object.isRequired
};

export default ListingTopInfo;
