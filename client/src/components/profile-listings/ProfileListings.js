import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getListingsHost,
  removeListing,
  clearListings,
} from '../../actions/listing';
import ListingItem from './ListingItem';
import Spinner from '../utils/Spinner';

const ProfileListings = ({
  getListingsHost,
  clearListings,
  removeListing,
  listing: { listings, loading },
}) => {
  useEffect(() => {
    getListingsHost();
    return () => clearListings();
  }, [getListingsHost, clearListings]);

  return (
    <div className='container page-wrap flex-grow max-w-screen-lg mx-auto mt-30 mb-4 px-8'>
      {loading || listings === null ? (
        <Spinner className='pt-20' />
      ) : (
        <div className='bg-secondary-200 px-8 py-6 lg:-mx-8 rounded-md'>
          <h1 className='section-heading'>My Listings</h1>
          {listings.length === 0 ? (
            <div className='my-10 text-md italic text-gray-500'>
              You do not have any listings.
            </div>
          ) : (
            <div className='flex flex-col mt-10'>
              {listings.map(listing => (
                <ListingItem
                  key={listing._id}
                  listing={listing}
                  removeListing={removeListing}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

ProfileListings.propTypes = {
  getListingsHost: PropTypes.func.isRequired,
  removeListing: PropTypes.func.isRequired,
  clearListings: PropTypes.func.isRequired,
  listing: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  listing: state.listing,
});

export default connect(mapStateToProps, {
  getListingsHost,
  removeListing,
  clearListings,
})(ProfileListings);
