import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ListingItem = ({
  listing: { _id, title, propertyType, maxGuests, pricePerNight, images }
}) => {
  return (
    <div className='rounded-b-lg shadow-md'>
      <Link to={`/listing/${_id}`}>
        <img
          src={images[0]}
          alt='Property'
          className='w-full h-56 md:h-48 rounded-t-lg object-cover'
        />
      </Link>
      <div className='flex justify-between items-center pt-3 pb-4 pl-4 pr-6'>
        <div>
          <div
            style={{ fontSize: '0.8rem' }}
            className='font-semibold text-gray-600 uppercase'
          >
            {propertyType}
            <span> · </span>
            {maxGuests} {maxGuests === 1 ? 'guest' : 'guests'}
          </div>
          <Link to={`/listing/${_id}`}>
            <h2 className='inline-block text-xl md:text-lg font-semibold text-gray-800 leading-tight'>
              {title}
            </h2>
          </Link>
        </div>
        <span
          style={{ fontSize: '1.30rem' }}
          className='text-accent-500 font-semibold tracking-wide'
        >
          €{pricePerNight}
        </span>
      </div>
    </div>
  );
};

ListingItem.propTypes = {
  listing: PropTypes.object.isRequired
};

export default ListingItem;
