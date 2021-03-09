import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getListingById, clearListings } from '../../actions/listing';
import ListingCarousel from './ListingCarousel';
import ListingTopInfo from './ListingTopInfo';
import ListingAvatar from './ListingAvatar';
import ListingAmenities from './ListingAmenities';
import ListingReservation from './ListingReservation';
import ListingDescription from './ListingDescription';
import ListingLocation from './ListingLocation';
import Spinner from '../utils/Spinner';

const Listing = ({
  match,
  getListingById,
  clearListings,
  listing: { listing, loading },
}) => {
  useEffect(() => {
    getListingById(match.params.id);
    return () => clearListings();
  }, [getListingById, clearListings, match.params.id]);

  return (
    <div className='container page-wrap flex-grow max-w-screen-lg mx-auto mt-30 mb-4 sm:px-8'>
      {listing === null || loading ? (
        <Spinner className='pt-20' />
      ) : (
        <div className='bg-secondary-200 px-4 sm:px-8 pb-10 lg:-mx-8 rounded-b-md'>
          <div className='listing-grid'>
            <div className='listing-carousel'>
              <ListingCarousel images={listing.images} />
            </div>
            <div className='info'>
              <div className='flex flex-col md:flex-row'>
                <ListingTopInfo listing={listing} />
                <ListingAvatar owner={listing.owner} />
              </div>
              <div className='section-line my-6' />
              {listing.description && (
                <Fragment>
                  <ListingDescription description={listing.description} />
                  <div className='section-line my-6' />
                </Fragment>
              )}
              {listing.amenities && (
                <ListingAmenities amenities={listing.amenities} />
              )}
            </div>
            <div className='reservation'>
              <ListingReservation
                owner={listing.owner}
                listingId={listing._id}
                pricePerNight={listing.pricePerNight}
                reservations={listing.reservations}
                maxGuests={listing.maxGuests}
              />
            </div>
            <div className='location'>
              {(listing.description || listing.amenities) && (
                <div className='section-line mt-2 mb-6' />
              )}
              <ListingLocation coordinates={listing.coordinates} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Listing.propTypes = {
  getListingById: PropTypes.func.isRequired,
  clearListings: PropTypes.func.isRequired,
  listing: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  listing: state.listing,
});

export default connect(mapStateToProps, { getListingById, clearListings })(
  Listing
);
