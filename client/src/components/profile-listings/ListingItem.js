import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ListingItem = ({ removeListing, listing }) => {
  return (
    <Fragment>
      <div className='w-full flex flex-col md:flex-row items-center'>
        <Link to={`/listing/${listing._id}`} className='w-full md:w-auto'>
          <img
            src={listing.images[0]}
            alt='Property'
            className='w-full h-64 md:h-32 md:w-64 object-cover'
          />
        </Link>
        <div className='mt-4 md:mt-0 md:ml-6 flex flex-row flex-wrap justify-center sm:justify-between w-full items-center'>
          <div className='w-full md:w-250px md:max-w-250px sm:w-auto text-center sm:text-left flex-grow sm:flex-grow-0 mb-2 sm:mb-0'>
            <Link to={`/listing/${listing._id}`}>
              <h1 className='text-xl font-semibold text-accent-500'>
                {listing.title}
              </h1>
            </Link>
            <h2 className='font-semibold inline-block'>
              {listing.pricePerNight} € / night
            </h2>
            <h3>{listing.location.join(', ')}</h3>
          </div>
          <div>
            <Link
              to={`/listing/${listing._id}/reservations`}
              className='btn btn-light block py-2 mx-auto mb-4 mt-2 sm:mt-0'
            >
              Reservations
            </Link>
            <button
              onClick={() => removeListing(listing._id)}
              className='btn btn-danger block py-2 mx-auto w-full'
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className='section-line my-8'></div>
    </Fragment>
  );
};

ListingItem.propTypes = {
  removeListing: PropTypes.func.isRequired,
  listing: PropTypes.object.isRequired
};

export default ListingItem;
