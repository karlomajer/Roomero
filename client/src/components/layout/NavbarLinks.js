import React from 'react';
import { Link } from 'react-router-dom';

export const AuthLinksDesktop = ({ logout, profileAuth }) => (
  <ul className='navbar-links items-center'>
    <li>
      <Link
        to='/new-listing'
        className='btn btn-primary px-4 py-2'
        style={{ paddingTop: '0.55rem', paddingBottom: '0.55rem' }}
      >
        <i className='fas fa-plus-square' style={{ marginRight: '0.5rem' }}></i>
        Create listing
      </Link>
    </li>
    <li>
      <Link to='/profile/me/listings'>Listings</Link>
    </li>
    <li>
      <Link to='/profile/me/reservations'>Reservations</Link>
    </li>
    {profileAuth && (
      <li>
        <div className='dropdown'>
          <div
            className='border-secondary-300'
            style={{
              display: 'inline-block',
              width: '2.75rem',
              height: '2.75rem',
              borderRadius: '100%',
              overflow: 'hidden',
              borderWidth: '4px',
            }}
          >
            <img
              src={profileAuth.avatar}
              className='h-full w-full object-cover'
              alt='Avatar'
            />
          </div>
          <span className='pl-3'>{profileAuth.name}</span>
          <div
            className='dropdown-content bg-gray-800 shadow rounded-sm'
            style={{ left: '-20px' }}
          >
            <Link
              to='/profile/me'
              className='block text-left pl-4 py-2 rounded-tl-sm rounded-tr-sm'
            >
              Profile
            </Link>
            <Link to='/edit-profile' className='block text-left pl-4 py-2'>
              Settings
            </Link>
            <div className='border-b border-accent-500' />
            <button
              onClick={() => logout()}
              className='block w-full text-left pl-4 py-2 rounded-bl-sm rounded-br-sm'
            >
              Logout
            </button>
          </div>
        </div>
      </li>
    )}
  </ul>
);

export const GuestLinksDesktop = () => (
  <ul className='navbar-links items-center' style={{ padding: '0.62rem 0' }}>
    <li>
      <Link to='/register'>Register</Link>
    </li>
    <li>
      <Link to='/login'>Login</Link>
    </li>
  </ul>
);

const closeHamburger = () => {
  document.body.classList.remove('overflow-hidden'); // To allow scroll after hamburger close
  document.getElementById('hamburger-menu').classList.remove('h-screen');
  document.getElementById('hamburger').classList.remove('hamburger-open');
};

export const AuthLinksMobile = ({ logout, profileAuth }) => (
  <ul className='navbar-links'>
    <li>
      <div>
        <Link to='/profile/me' onClick={closeHamburger}>
          <div
            style={{
              width: '5.5rem',
              height: '5.5rem',
              borderRadius: '100%',
              overflow: 'hidden',
              margin: '0 auto',
              marginBottom: '0.25rem',
              borderWidth: '5px',
            }}
            className='border-secondary-300'
          >
            <img
              src={profileAuth.avatar}
              className='h-full w-full object-cover cursor-pointer'
              alt='Avatar'
            />
          </div>
          <div className='text-2xl font-medium'>{profileAuth.name}</div>
        </Link>
        <div
          className='mt-5 mb-1 bg-accent-500 mx-auto'
          style={{ width: '65px', height: '3px' }}
        >
          {' '}
        </div>
      </div>
    </li>

    <li className='text-2xl' style={{ fontWeight: '300' }}>
      <Link to='/new-listing' onClick={closeHamburger}>
        Create Listing
      </Link>
    </li>
    <li className='text-2xl' style={{ fontWeight: '300' }}>
      <Link to='/profile/me/listings' onClick={closeHamburger}>
        Listings
      </Link>
    </li>
    <li className='text-2xl' style={{ fontWeight: '300' }}>
      <Link to='/profile/me/reservations' onClick={closeHamburger}>
        Reservations
      </Link>
    </li>
    <li className='text-2xl'>
      <button
        style={{ fontWeight: '300' }}
        href=''
        onClick={() => {
          closeHamburger();
          logout();
        }}
      >
        Logout
      </button>
    </li>
  </ul>
);

export const GuestLinksMobile = () => (
  <ul className='navbar-links'>
    <li className='text-2xl' style={{ fontWeight: '300' }}>
      <Link to='/register' onClick={closeHamburger}>
        Register
      </Link>
    </li>
    <li className='text-2xl' style={{ fontWeight: '300' }}>
      <Link to='/login' onClick={closeHamburger}>
        Login
      </Link>
    </li>
  </ul>
);
