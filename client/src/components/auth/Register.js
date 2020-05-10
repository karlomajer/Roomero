import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register(name, email, password);
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='container page-wrap max-w-screen-sm mx-auto my-20 px-8 sm:px-24 md:py-4'>
      <h1 className='section-heading text-3xl md:text-4xl'>
        Create an Account
      </h1>
      <form className='form mt-6' onSubmit={e => onSubmit(e)}>
        <div className='form-group md:flex-col md:items-start'>
          <input
            id='name'
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            className='input'
            required
          />
          <label htmlFor='name' className='input-label'>
            Name *
          </label>
        </div>
        <div className='form-group md:flex-col md:items-start'>
          <input
            id='email'
            type='email'
            placeholder='Email address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            className='input'
            required
          />
          <label htmlFor='email' className='input-label'>
            Email *
          </label>
        </div>
        <div className='form-group md:flex-col md:items-start'>
          <input
            id='password'
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            className='input'
            minLength='6'
            required
          />
          <label htmlFor='password' className='input-label'>
            Password *
          </label>
        </div>
        <div className='form-group md:flex-col md:items-start'>
          <input
            id='password2'
            type='password'
            placeholder='Confirm password'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
            className='input'
            minLength='6'
            required
          />
          <label htmlFor='password2' className='input-label'>
            Confirm Password *
          </label>
        </div>
        <input
          type='submit'
          className='btn btn-primary mt-2 w-full'
          value='Sign Up'
        />
      </form>
      <p className='my-1'>
        Already have an account?{' '}
        <Link to='/login' className='text-accent-500 font-semibold'>
          Sign In
        </Link>
      </p>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
