import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  getListingsHost,
  removeListing,
  clearListings,
} from '../../actions/listing';
import ListingItem from './ListingItem';

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

  // TODO: add spinner

  return (
    <div className='container page-wrap max-w-screen-lg mx-auto my-20 px-8 md:py-4'>
      {loading || listings === null ? (
        <div>...loading</div>
      ) : (
        <Fragment>
          <h1 className='section-heading'>My Listings</h1>
          <div className='my-10 block md:hidden'>
            <Link
              to='new-listing'
              className='btn btn-primary w-full md:w-auto py-3 text-center normal-case text-lg'
            >
              <i
                class='fas fa-plus-square'
                style={{
                  marginRight: '0.5rem',
                  verticalAlign: '-.0667em',
                  fontSize: '1.05em',
                }}
              ></i>
              Create a New Listing
            </Link>
          </div>
          {listings.length === 0 ? (
            <div className='my-10 text-md italic'>
              You do not have any listings.
            </div>
          ) : (
            <div className='flex flex-col my-10'>
              {listings.map((listing) => (
                <ListingItem
                  key={listing._id}
                  listing={listing}
                  removeListing={removeListing}
                />
              ))}
            </div>
          )}
        </Fragment>
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

const mapStateToProps = (state) => ({
  listing: state.listing,
});

export default connect(mapStateToProps, {
  getListingsHost,
  removeListing,
  clearListings,
})(ProfileListings);
