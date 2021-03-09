import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ListingAvatar = ({ owner: { name, avatar, _id } }) => {
  return (
    <div className='ml-4 md:pr-4 mb-0 mt-6 md:mt-2'>
      <Link
        to={`/profile/${_id}`}
        className='text-gray-600 hover:text-accent-500 transition-colors duration-200'
      >
        <div
          className='mx-auto cursor-pointer border-secondary-300'
          style={{
            width: '4.45rem',
            height: '4.45rem',
            borderRadius: '100%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: '4px',
          }}
        >
          <img
            style={{ height: '-webkit-fill-available' }}
            src={avatar}
            className='h-full w-full object-cover'
            alt='Avatar'
          />
        </div>
        <h3 className='font-medium text-sm text-center leading-tight pt-2'>
          {name.split(' ')[0]}
        </h3>
      </Link>
    </div>
  );
};

ListingAvatar.propTypes = {
  owner: PropTypes.object.isRequired,
};

export default ListingAvatar;
