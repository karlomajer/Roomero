import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import listing from './listing';
import profile from './profile';
import upload from './upload';

export default combineReducers({
  auth,
  alert,
  listing,
  profile,
  upload,
});
