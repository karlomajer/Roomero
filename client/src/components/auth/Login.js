import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='container page-wrap max-w-screen-sm mx-auto my-20 px-8 sm:px-24 md:py-4'>
      <h1 className='section-heading text-3xl md:text-4xl'>Sign In</h1>
      <form className='form mt-6' onSubmit={e => onSubmit(e)}>
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
            Email
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
            Password
          </label>
        </div>
        <input
          type='submit'
          className='btn btn-primary mt-2 w-full'
          value='Sign In'
        />
      </form>
      <p className='my-1'>
        Don't have an account?{' '}
        <Link to='/register' className='text-accent-500 font-semibold'>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
