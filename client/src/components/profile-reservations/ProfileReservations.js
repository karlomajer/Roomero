import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGuestReservations, clearReservations } from '../../actions/listing';
import ReservationItem from '../utils/ReservationItem/ReservationItem';

const ProfileReservations = ({
  getGuestReservations,
  clearReservations,
  listing,
}) => {
  useEffect(() => {
    getGuestReservations();
    return () => clearReservations();
  }, [getGuestReservations, clearReservations]);

  // TODO: Add spinner

  return (
    <div className='container page-wrap max-w-screen-lg mx-auto my-20 px-8 md:py-4'>
      {listing === null || listing.loading ? (
        <div>...loading</div>
      ) : (
        <Fragment>
          <h1 className='section-heading'>My Reservations</h1>
          {listing.reservations.length === 0 ? (
            <div className='my-10 text-md italic'>
              You do not have any reservation.
            </div>
          ) : (
            <div className='flex flex-col my-10'>
              {listing.reservations.map(reservation => (
                <ReservationItem
                  key={reservation._id}
                  reservation={reservation}
                  host={false}
                />
              ))}
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

ProfileReservations.propTypes = {
  getGuestReservations: PropTypes.func.isRequired,
  clearReservations: PropTypes.func.isRequired,
  listing: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  listing: state.listing,
});

export default connect(mapStateToProps, {
  getGuestReservations,
  clearReservations,
})(ProfileReservations);
