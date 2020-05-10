import React, { Fragment, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import {
  AuthLinksDesktop,
  GuestLinksDesktop,
  AuthLinksMobile,
  GuestLinksMobile,
} from './NavbarLinks';

const Navbar = ({ auth: { isAuthenticated, loading }, profile, logout }) => {
  const mediaQueryList = useMemo(
    () => window.matchMedia('(max-width: 767px)'),
    []
  );

  const [matches, setMatches] = useState(mediaQueryList.matches);

  useEffect(() => {
    const listener = e => {
      setMatches(e.matches);
    };

    mediaQueryList.addEventListener('change', listener);

    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [mediaQueryList]);

  const toggleHamburger = () => {
    document.body.classList.toggle('overflow-hidden'); // To prevent body scroll
    document.getElementById('hamburger-menu').classList.toggle('h-screen');
    document.getElementById('hamburger').classList.toggle('hamburger-open');
  };

  const hamburgerMenu = (
    <div id='hamburger-menu' className='overlay h-0'>
      <div className='overlay-content'>
        {!loading && !profile.loading && isAuthenticated ? (
          <AuthLinksMobile logout={logout} profileAuth={profile.profileAuth} />
        ) : (
          <GuestLinksMobile />
        )}
      </div>
    </div>
  );

  return (
    <nav className='navbar border-b border-gray-200' style={{ zIndex: '1' }}>
      <h1 className='text-2xl font-bold text-accent-500'>
        <Link
          to='/'
          onClick={() =>
            window.location.pathname === '/' && window.location.reload()
          }
        >
          <i className='fas fa-home'></i> Roomero
        </Link>
      </h1>
      {matches ? (
        <Fragment>
          <button
            id='hamburger'
            className='hamburger'
            onClick={toggleHamburger}
          />
          {hamburgerMenu}
        </Fragment>
      ) : (
        <Fragment>
          {!loading && !profile.loading && isAuthenticated ? (
            <AuthLinksDesktop
              logout={logout}
              profileAuth={profile.profileAuth}
            />
          ) : (
            <GuestLinksDesktop />
          )}
        </Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { logout })(Navbar);
