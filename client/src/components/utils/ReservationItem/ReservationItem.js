import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReservationItemAvatar from './ReservationItemAvatar';
import { removeReservation } from '../../../actions/listing';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import Truncate from 'react-truncate';

const moment = extendMoment(Moment);

const ReservationItem = ({
  removeReservation,
  reservation: { _id, listing, owner, guest, totalPrice, startDate, endDate },
  host,
}) => {
  const formatDate = () => {
    const start = moment(startDate);
    const end = moment(endDate);
    if (start.year() !== end.year()) {
      return `${start.format(
        'MMM'
      )} ${start.date()}, ${start.year()} - ${end.format(
        'MMM'
      )} ${end.date()}, ${end.year()}`;
    } else if (start.month() !== end.month()) {
      return `${start.format('MMM')} ${start.date()} - ${end.format(
        'MMM'
      )} ${end.date()}, ${start.year()}`;
    } else {
      return `${start.format(
        'MMM'
      )} ${start.date()} - ${end.date()}, ${start.year()}`;
    }
  };

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
        <div className='mt-4 md:mt-0 md:ml-6 flex flex-row flex-wrap justify-end sm:justify-between w-full items-center'>
          <div className='w-full md:w-250px md:max-w-250px flex-grow md:flex-grow-0 mb-2 md:mb-0'>
            <h1 className='text-xl font-semibold'>{formatDate()}</h1>
            <Link to={`/listing/${listing._id}`} className='block'>
              <Truncate
                className='font-semibold text-accent-500 inline-block'
                lines={2}
                ellipsis={<span>...</span>}
              >
                {listing.title}
              </Truncate>
            </Link>
            <Truncate
              className='text-gray-500 block'
              lines={2}
              ellipsis={<span>...</span>}
            >
              {listing.location.join(', ')}
            </Truncate>
          </div>
          <ReservationItemAvatar
            id={host ? guest._id : owner._id}
            name={host ? guest.name : owner.name}
            avatar={host ? guest.avatar : owner.avatar}
          />
          <div>
            <p className='text-lg font-semibold text-center mb-2'>
              € {totalPrice}
            </p>
            <button
              onClick={() => removeReservation(_id)}
              className='btn bg-secondary-200 text-red-600 block py-2 mx-auto w-full'
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ReservationItem.propTypes = {
  removeReservation: PropTypes.func.isRequired,
  reservation: PropTypes.object.isRequired,
  host: PropTypes.bool.isRequired,
};

export default connect(null, { removeReservation })(ReservationItem);
