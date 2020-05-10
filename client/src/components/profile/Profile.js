import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileById, clearProfile } from '../../actions/profile';

// TODO: Add spinner

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
    <div className='container page-wrap max-w-screen-lg mx-auto my-20 px-8 md:py-4'>
      {profile === null || loading ? (
        <div>...loading</div>
      ) : (
        <Fragment>
          <div className='flex flex-col items-center'>
            <h1 className='text-4xl font-medium'>Hi, I'm {profile.name}</h1>
            <span className='block'>
              Joined in {new Date(profile.date).getFullYear()}
            </span>
            <div
              className='mx-auto my-4'
              style={{
                width: '6rem',
                height: '6rem',
                borderRadius: '100%',
                overflow: 'hidden',
              }}
            >
              <img
                src={profile.avatar}
                className='object-cover cursor-pointer'
                alt='Avatar'
              />
            </div>
            {auth.loading === false &&
              auth.isAuthenticated &&
              profileAuth._id === profile._id && (
                <Link
                  to='/edit-profile'
                  className='btn btn-light text-accent-500 shadow-none border border-gray-300'
                >
                  Edit Profile
                </Link>
              )}
          </div>
          <div className='section-line my-8 w-full md:max-w-md mx-auto' />
          <div>
            <h2 className='text-xl font-semibold mt-3'>Bio</h2>
            {!profile.bio ? (
              <p className='italic'>This user has not added a bio yet.</p>
            ) : (
              <p>{profile.bio}</p>
            )}
          </div>
          <div>
            <h2 className='text-xl font-semibold mt-3'>Location</h2>
            {!profile.location ? (
              <p className='italic'>This user has not added a location yet.</p>
            ) : (
              <p>{profile.location}</p>
            )}
          </div>
          <div>
            <h2 className='text-xl font-semibold mt-3'>Languages</h2>
            {profile.languages.length === 0 ? (
              <p className='italic'>
                This user has not added any languages yet.
              </p>
            ) : (
              <p>{profile.languages.join(', ')}</p>
            )}
          </div>
        </Fragment>
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
