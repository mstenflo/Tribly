import { GET_LATEST, LATEST_ERROR } from '../actions/types';

const initialState = {
  latest: null,
  loading: true,
  error: {},
};

export default function latest(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LATEST:
      return {
        ...state,
        latest: payload,
        loading: false,
      };
    case LATEST_ERROR:
      return {
        ...state,
        latest: null,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
