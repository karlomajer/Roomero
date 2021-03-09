import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Truncate from 'react-truncate';

const ListingItem = ({ removeListing, listing }) => {
  return (
    <div className='bg-secondary-300 px-6 py-7 mb-5 rounded-lg'>
      <div className='w-full flex flex-col md:flex-row items-center'>
        <Link to={`/listing/${listing._id}`} className='w-full md:w-auto'>
          <img
            src={listing.images[0]}
            alt='Property'
            className='w-full h-64 md:h-32 md:w-64 object-cover rounded'
          />
        </Link>
        <div className='mt-4 md:mt-0 md:ml-6 flex flex-row flex-wrap justify-center sm:justify-between w-full items-center'>
          <div className='w-full md:w-250px md:max-w-250px sm:w-auto text-center sm:text-left flex-grow sm:flex-grow-0 mb-2 sm:mb-0'>
            <Link to={`/listing/${listing._id}`} className='block'>
              <Truncate
                className='text-xl font-semibold text-accent-500'
                lines={2}
                ellipsis={<span>...</span>}
              >
                {listing.title}
              </Truncate>
            </Link>
            <h2 className='font-semibold inline-block'>
              {listing.pricePerNight} € / night
            </h2>
            <Truncate
              className='text-gray-500 block'
              lines={2}
              ellipsis={<span>...</span>}
            >
              {listing.location.join(', ')}
            </Truncate>
          </div>
          <div>
            <Link
              to={`/listing/${listing._id}/reservations`}
              className='btn btn-primary block py-2 mx-auto mb-4 mt-2 sm:mt-0'
            >
              Reservations
            </Link>
            <button
              onClick={() => removeListing(listing._id)}
              className='btn bg-secondary-200 text-red-600 block py-2 mx-auto w-full'
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ListingItem.propTypes = {
  removeListing: PropTypes.func.isRequired,
  listing: PropTypes.object.isRequired,
};

export default ListingItem;
