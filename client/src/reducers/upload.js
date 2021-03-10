import { SET_LOADING } from '../actions/types';

const initialState = {
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return {
        loading: payload,
      };
    default:
      return state;
  }
}
