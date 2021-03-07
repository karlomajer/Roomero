import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createProfile } from '../../actions/profile';
import FileUpload from '../utils/FileUpload';
import Spinner from '../utils/Spinner';

const EditProfile = ({
  history,
  createProfile,
  profile: { profileAuth, loading },
}) => {
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    languages: [],
    avatar: [],
  });

  useEffect(() => {
    if (loading === false) {
      setFormData({
        bio: loading || !profileAuth.bio ? '' : profileAuth.bio,
        location: loading || !profileAuth.location ? '' : profileAuth.location,
        languages:
          loading || !profileAuth.languages
            ? ''
            : profileAuth.languages.join(', '),
        avatar: loading || !profileAuth.avatar ? '' : profileAuth.avatar,
      });
    }
  }, [loading, profileAuth]);

  const { bio, location, languages, avatar } = formData;

  // For FileUpload
  const [files, setFiles] = useState([]);
  const [uploadData, setUploadData] = useState({});

  // Display avatar preview
  useEffect(() => {
    if (files.length > 0) {
      document.getElementById('avatar').src = URL.createObjectURL(files[0]);
    }
  }, [files]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const _formData = {
      ...formData,
      previousAvatar:
        avatar !== uploadData.filePaths &&
        uploadData.filePaths !== undefined &&
        avatar,
      avatar: uploadData.filePaths,
    };
    createProfile(_formData, history, true);
  };

  return (
    <div className='container page-wrap flex-grow max-w-screen-xl mx-auto mt-20 mb-4 px-4 sm:px-8 md:px-10'>
      {profileAuth === null || loading ? (
        <Spinner className='pt-20' />
      ) : (
        <div className='bg-secondary-200 mt-10 px-6 md:px-10 py-6 rounded-md'>
          <h2 className='section-heading'>Edit Profile</h2>
          <form className='mt-10' onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                id='bio'
                name='bio'
                value={bio}
                onChange={onChange}
                className='input input-half'
                type='text'
                placeholder='Bio'
              />
              <label htmlFor='bio' className='input-label'>
                Bio
              </label>
            </div>
            <div className='form-group'>
              <input
                id='location'
                name='location'
                value={location}
                onChange={onChange}
                className='input input-half'
                type='text'
                placeholder='Location'
              />
              <label htmlFor='location' className='input-label'>
                Location
              </label>
            </div>
            <div className='form-group flex-wrap'>
              <input
                id='languages'
                name='languages'
                value={languages}
                onChange={onChange}
                className='input input-half'
                type='text'
                placeholder='Languages'
              />
              <label htmlFor='languages' className='input-label'>
                Languages
              </label>
              <div className='flex-break' />
              <small className='ml-0 md:ml-40 pt-1 text-gray-500 italic'>
                Please use comma separated values (eg. English, German, Italian)
              </small>
            </div>
            <div className='form-group sm:flex-wrap'>
              <FileUpload
                uploadLocation={'avatars'}
                files={files}
                setFiles={setFiles}
                setUploadData={setUploadData}
                multiple={false}
                required={false}
              />
              <label className='input-label'>Avatar</label>
            </div>
            <div className='form-group'>
              <div
                className='mx-auto md:mx-0 cursor-pointer'
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
                  className='w-full'
                  style={{ height: '-webkit-fill-available' }}
                  id='avatar'
                  src={avatar}
                  className='w-full object-cover'
                  alt='Avatar'
                />
              </div>
              <label className='input-label'></label>
            </div>
            <input
              type='submit'
              className='btn btn-primary my-5 w-full md:w-auto'
              value='Update profile'
            />
          </form>
        </div>
      )}
    </div>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile })(EditProfile);
