import React from 'react';
import { Link } from 'react-router-dom';

export const AuthLinksDesktop = ({ logout, profileAuth }) => (
  <ul className='navbar-links items-center'>
    <li>
      <Link
        to='new-listing'
        className='btn btn-primary px-4 py-2'
        style={{ paddingTop: '0.55rem', paddingBottom: '0.55rem' }}
      >
        <i class='fas fa-plus-square' style={{ marginRight: '0.5rem' }}></i>
        Create listing
      </Link>
    </li>
    <li>
      <Link to='/profile/me/listings'>Listings</Link>
    </li>
    <li>
      <Link to='/profile/me/reservations'>Reservations</Link>
    </li>
    <li>
      <div class='dropdown'>
        <div
          style={{
            display: 'inline-block',
            width: '2.75rem',
            height: '2.75rem',
            borderRadius: '100%',
            overflow: 'hidden',
          }}
        >
          <img
            src={profileAuth.avatar}
            className='object-cover cursor-pointer'
            alt='Avatar'
          />
        </div>
        <span className='pl-3'>{profileAuth.name}</span>
        <div class='dropdown-content'>
          <Link to='/profile/me' className='block text-left pl-4 py-2'>
            Profile
          </Link>
          <Link to='/edit-profile' className='block text-left pl-4 py-2'>
            Settings
          </Link>
          <div className='section-line' />
          <a
            href=''
            onClick={() => logout()}
            className='block text-left pl-4 py-2'
          >
            Logout
          </a>
        </div>
      </div>
    </li>
  </ul>
);

export const GuestLinksDesktop = () => (
  <ul className='navbar-links' style={{ padding: '0.62rem 0' }}>
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
      <Link to='/profile/me' onClick={closeHamburger}>
        <div
          style={{
            width: '7rem',
            height: '7rem',
            borderRadius: '100%',
            overflow: 'hidden',
            margin: '0 auto',
            marginBottom: '-0.75rem',
          }}
        >
          <img
            src={profileAuth.avatar}
            className='object-cover cursor-pointer'
            alt='Avatar'
          />
        </div>
        <span className='text-2xl font-medium'>{profileAuth.name}</span>
      </Link>
    </li>
    <li>
      <Link to='/profile/me/listings' onClick={closeHamburger}>
        Listings
      </Link>
    </li>
    <li>
      <Link to='/profile/me/reservations' onClick={closeHamburger}>
        Reservations
      </Link>
    </li>
    <li>
      <a
        href=''
        onClick={() => {
          closeHamburger();
          logout();
        }}
      >
        Logout
      </a>
    </li>
  </ul>
);

export const GuestLinksMobile = () => (
  <ul className='navbar-links'>
    <li>
      <Link to='/register' onClick={closeHamburger}>
        Register
      </Link>
    </li>
    <li>
      <Link to='/login' onClick={closeHamburger}>
        Login
      </Link>
    </li>
  </ul>
);
