import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ListingAvatar = ({ owner: { name, avatar, _id } }) => {
  return (
    <div className='ml-4 md:pr-4 mb-0 mt-6 md:mt-2'>
      <Link to={`/profile/${_id}`}>
        <div
          className='mx-auto cursor-pointer'
          style={{
            width: '4.15rem',
            height: '4.15rem',
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
        <h3 className='font-medium text-sm text-center leading-tight pt-2 text-gray-600'>
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
