import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ReservationItemAvatar = ({ id, name, avatar }) => {
  return (
    <div className='flex flex-row items-center'>
      <Link to={`/profile/${id}`}>
        <div
          className='mx-auto cursor-pointer'
          style={{
            width: '4rem',
            height: '4rem',
            borderRadius: '100%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img
            style={{ height: '-webkit-fill-available' }}
            src={avatar}
            className='object-cover'
            alt='Avatar'
          />
        </div>
      </Link>
      <div className='ml-3'>
        <Link to={`/profile/${id}`}>
          <h3 className='font-semibold text-center leading-tight text-gray-700 text-accent-500'>
            {name}
          </h3>
        </Link>
        <p>0 reviews</p>
      </div>
    </div>
  );
};

ReservationItemAvatar.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
};

export default ReservationItemAvatar;
