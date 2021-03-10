import { SET_LOADING } from './types';

export const setLoading = payload => dispatch => {
  dispatch({ type: SET_LOADING, payload });
};
