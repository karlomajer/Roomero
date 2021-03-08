import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Truncate from 'react-truncate';

const ReservationItemAvatar = ({ id, name, avatar }) => {
  return (
    <div className='flex flex-row items-center'>
      <Link to={`/profile/${id}`}>
        <div
          className='mx-auto cursor-pointer'
          style={{
            width: '3.75rem',
            height: '3.75rem',
            borderRadius: '100%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            style={{ height: '-webkit-fill-available' }}
            src={avatar}
            className='w-full object-cover'
            alt='Avatar'
          />
        </div>
      </Link>
      <span
        className='w-full ml-3 flex-1 flex-nowrap'
        style={{ width: '115px', maxWidth: '115px' }}
      >
        <Link to={`/profile/${id}`} className='block'>
          <Truncate
            className='font-semibold text-left leading-tight text-gray-700 text-accent-500'
            lines={1}
            ellipsis={<span>...</span>}
          >
            {name}
          </Truncate>
        </Link>
        <p className='text-gray-500'>0 reviews</p>
      </span>
    </div>
  );
};

ReservationItemAvatar.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default ReservationItemAvatar;
