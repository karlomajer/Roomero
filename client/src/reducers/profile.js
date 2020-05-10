import {
  GET_PROFILE_AUTH,
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  CLEAR_PROFILE_AUTH,
  UPDATE_PROFILE
} from '../actions/types';

const initialState = {
  profileAuth: null, // This stores the logged in users profile into state so that it can be displayed in navbar at all time
  profile: null, // This stores the currently visited profile into state
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE_AUTH:
    case UPDATE_PROFILE:
      return {
        ...state,
        profileAuth: payload,
        loading: false
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };
    case CLEAR_PROFILE_AUTH:
      return {
        ...state,
        profileAuth: null,
        profile: null,
        loading: false
      };
    default:
      return state;
  }
}
