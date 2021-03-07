import React, { Fragment, useEffect } from 'react';
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
  listing: { reservations, loading },
}) => {
  useEffect(() => {
    getListingReservations(match.params.id);
    return () => clearReservations();
  }, [getListingReservations, clearReservations, match.params.id]);
  return (
    <div className='container page-wrap flex-grow max-w-screen-lg mx-auto my-20 px-8 md:py-4'>
      {loading ? (
        <Spinner className='pt-20' />
      ) : (
        <Fragment>
          <h1 className='section-heading'>Listing Reservations</h1>
          {reservations.length === 0 ? (
            <div className='my-10 text-md italic'>
              You do not have any reservations for this listing.
            </div>
          ) : (
            <div className='flex flex-col my-10'>
              {reservations.map(reservation => (
                <ReservationItem
                  key={reservation._id}
                  reservation={reservation}
                  host={true}
                />
              ))}
            </div>
          )}
        </Fragment>
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
