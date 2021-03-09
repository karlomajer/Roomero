import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_LISTINGS,
  LISTING_ERROR,
  GET_LISTING,
  REMOVE_LISTING,
  CLEAR_LISTING,
  REMOVE_RESERVATION,
  RESERVATION_ERROR,
  GET_RESERVATIONS,
  CLEAR_RESERVATIONS,
  SET_LOADING,
} from './types';

// Get listings
export const getListings = location => async dispatch => {
  try {
    let res;

    if (location === undefined) {
      res = await axios.get('/api/listings/recent');
    } else {
      // Get listings based on location
      res = await axios.get('/api/listings/?location=' + location);
    }

    dispatch({
      type: GET_LISTINGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.statusText, 'danger'));
    dispatch({
      type: LISTING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Host Listings
export const getListingsHost = () => async dispatch => {
  try {
    const res = await axios.get('/api/listings/me');

    dispatch({
      type: GET_LISTINGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.statusText, 'danger'));
    dispatch({
      type: LISTING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get listing by id
export const getListingById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/listings/${id}`);

    dispatch({
      type: GET_LISTING,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.statusText, 'danger'));
    dispatch({
      type: LISTING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Clear listing and listings
export const clearListings = () => dispatch => {
  dispatch({ type: CLEAR_LISTING });
};

// Add listing
export const createListing = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/listings', formData, config);

    dispatch(setAlert('Listing created!', 'success'));
    history.push(`/listing/${res.data._id}`);
  } catch (err) {
    // Show any backend validation errors that were returned as a response (like if we forget a required field)
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LISTING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove listing
export const removeListing = id => async dispatch => {
  try {
    await axios.delete(`/api/listings/${id}`);

    dispatch({
      type: REMOVE_LISTING,
      payload: id,
    });

    dispatch(setAlert('Listing removed', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.statusText, 'danger'));
    dispatch({
      type: LISTING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add reservation
export const addReservation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.put(
      `/api/listings/reservation/${formData.listing}`,
      formData,
      config
    );

    history.push('/profile/me/reservations');
    dispatch(setAlert('Reservation added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch(setAlert(err.response.statusText, 'danger'));
    dispatch({
      type: RESERVATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get guests reservations
export const getGuestReservations = () => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING,
    });

    const res = await axios.get('/api/listings/reservation/me');

    dispatch({
      type: GET_RESERVATIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.statusText, 'danger'));
    dispatch({
      type: RESERVATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get reservations by listing id
export const getListingReservations = id => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING,
    });

    const res = await axios.get(`/api/listings/${id}/reservation`);

    dispatch({
      type: GET_RESERVATIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.statusText, 'danger'));
    dispatch({
      type: RESERVATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove reservation
export const removeReservation = id => async dispatch => {
  try {
    await axios.delete(`/api/listings/reservation/${id}`);

    dispatch({
      type: REMOVE_RESERVATION,
      payload: id,
    });

    dispatch(setAlert('Reservation removed', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.statusText, 'danger'));
    dispatch({
      type: RESERVATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Clear reservations
export const clearReservations = () => dispatch => {
  dispatch({ type: CLEAR_RESERVATIONS });
};
