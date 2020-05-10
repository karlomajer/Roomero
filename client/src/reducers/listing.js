import {
  GET_LISTINGS,
  LISTING_ERROR,
  GET_LISTING,
  REMOVE_LISTING,
  CLEAR_LISTING,
  GET_RESERVATIONS,
  REMOVE_RESERVATION,
  RESERVATION_ERROR,
  CLEAR_RESERVATIONS
} from '../actions/types';

const initialState = {
  listings: [],
  listing: null,
  reservations: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LISTINGS:
      return {
        ...state,
        listings: payload,
        loading: false
      };
    case GET_LISTING:
      return {
        ...state,
        listing: payload,
        loading: false
      };
    case REMOVE_LISTING:
      return {
        ...state,
        listings: state.listings.filter(listing => listing._id !== payload),
        loading: false
      };
    case LISTING_ERROR:
    case RESERVATION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_LISTING:
      return {
        ...state,
        listing: null,
        listings: null,
        loading: false
      };
    case GET_RESERVATIONS:
      return {
        ...state,
        reservations: payload,
        loading: false
      };
    case REMOVE_RESERVATION:
      return {
        ...state,
        reservations: state.reservations.filter(
          reservation => reservation._id !== payload
        ),
        loading: false
      };
    case CLEAR_RESERVATIONS:
      return {
        ...state,
        reservations: [],
        loading: false
      };
    default:
      return state;
  }
}
