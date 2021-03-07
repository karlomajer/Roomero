import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ListingItem = ({
  listing: { _id, title, propertyType, maxGuests, pricePerNight, images },
}) => {
  return (
    <Link to={`/listing/${_id}`}>
      <div
        className='flex flex-col rounded-b-lg shadow-md bg-secondary-300'
        style={{ minHeight: '306px' }}
      >
        <img
          src={images[0]}
          alt='Property'
          className='w-full h-56 md:h-48 rounded-t-lg object-cover'
        />
        <div className='flex flex-1 justify-between pt-3 pb-4 pl-4 pr-6'>
          <div>
            <div
              style={{ fontSize: '0.8rem' }}
              className='font-semibold text-gray-600 uppercase'
            >
              {propertyType}
              <span> · </span>
              {maxGuests} {maxGuests === 1 ? 'guest' : 'guests'}
            </div>
            <h2 className='mt-1 inline-block text-lg font-medium text-gray-50 leading-tight'>
              {title}
            </h2>
          </div>
          <span
            style={{ fontSize: '1.30rem' }}
            className='ml-4 self-center text-accent-500 font-semibold tracking-wide'
          >
            €{pricePerNight}
          </span>
        </div>
      </div>
    </Link>
  );
};

ListingItem.propTypes = {
  listing: PropTypes.object.isRequired,
};

export default ListingItem;
