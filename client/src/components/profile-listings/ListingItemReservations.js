import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getListingReservations,
  clearReservations,
} from '../../actions/listing';
import ReservationItem from '../utils/ReservationItem/ReservationItem';
import Spinner from '../utils/Spinner';

const ListingItemReservations = ({
  match,
  getListingReservations,
  clearReservations,
  listing,
}) => {
  useEffect(() => {
    getListingReservations(match.params.id);
    return () => clearReservations();
  }, [getListingReservations, clearReservations, match.params.id]);
  return (
    <div className='container page-wrap flex-grow max-w-screen-lg mx-auto mt-30 mb-4 sm:px-8'>
      {listing.loading || listing?.reservations === null ? (
        <Spinner className='pt-20' />
      ) : (
        <div className='bg-secondary-200 px-8 py-6 lg:-mx-8 sm:rounded-md'>
          <h1 className='section-heading'>Listing Reservations</h1>
          {listing.reservations.length === 0 ? (
            <div className='my-10 text-md italic text-gray-500'>
              You do not have any reservations for this listing.
            </div>
          ) : (
            <div className='flex flex-col my-10'>
              {listing.reservations.map(reservation => (
                <ReservationItem
                  key={reservation._id}
                  reservation={reservation}
                  host={true}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

ListingItemReservations.propTypes = {
  getListingReservations: PropTypes.func.isRequired,
  clearReservations: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  listing: state.listing,
});

export default connect(mapStateToProps, {
  getListingReservations,
  clearReservations,
})(ListingItemReservations);
