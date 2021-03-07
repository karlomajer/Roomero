import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getProfileById, clearProfile } from '../../actions/profile';
import Spinner from '../utils/Spinner';

const Profile = ({
  match,
  getProfileById,
  clearProfile,
  profile: { profile, profileAuth, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
    return () => clearProfile();
  }, [getProfileById, clearProfile, match.params.id]);

  return (
    <div className='container page-wrap flex-grow max-w-screen-xl mx-auto mt-20 mb-4 px-4 sm:px-8 md:px-10'>
      {profile === null || loading ? (
        match.params.id === 'me' && !auth.loading && profileAuth === null ? (
          <Redirect to='/' />
        ) : (
          <Spinner className='pt-20' />
        )
      ) : (
        <div className='bg-secondary-200 mt-10 px-6 md:px-10 pt-6 pb-8 rounded-md'>
          <div className='flex flex-col items-center'>
            <h1 className='text-4xl font-medium'>Hi, I'm {profile.name}</h1>
            <span className='block text-gray-400'>
              Joined in {new Date(profile.date).getFullYear()}
            </span>
            <div
              className='mx-auto my-4 border-secondary-300'
              style={{
                width: '6.75rem',
                height: '6.75rem',
                borderRadius: '100%',
                overflow: 'hidden',
                borderWidth: '6px',
              }}
            >
              <img
                src={profile.avatar}
                className='w-full object-cover cursor-pointer'
                alt='Avatar'
              />
            </div>
            {auth.loading === false &&
              auth.isAuthenticated &&
              profileAuth._id === profile._id && (
                <Link
                  to='/edit-profile'
                  className='mt-3 btn bg-secondary-300 text-accent-500 border-none'
                >
                  Edit Profile
                </Link>
              )}
          </div>
          <div className='section-line my-8 w-full md:max-w-md mx-auto' />
          <div>
            <h2 className='text-xl font-semibold mt-3'>Bio</h2>
            {!profile.bio ? (
              <p className='italic text-gray-400'>
                This user has not added a bio yet.
              </p>
            ) : (
              <p className='text-gray-400'>{profile.bio}</p>
            )}
          </div>
          <div>
            <h2 className='text-xl font-semibold mt-3'>Location</h2>
            {!profile.location ? (
              <p className='italic text-gray-400'>
                This user has not added a location yet.
              </p>
            ) : (
              <p className='text-gray-400'>{profile.location}</p>
            )}
          </div>
          <div>
            <h2 className='text-xl font-semibold mt-3'>Languages</h2>
            {profile.languages.length === 0 ? (
              <p className='italic text-gray-400'>
                This user has not added any languages yet.
              </p>
            ) : (
              <p className='text-gray-400'>{profile.languages.join(', ')}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById, clearProfile })(
  Profile
);
