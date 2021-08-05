import {
  GET_CONTRIBUTIONS,
  CONTRIBUTION_ERROR,
  ADD_CONTRIBUTION,
} from '../actions/types';

const initialState = {
  contributions: [],
  contribution: null,
  loading: false,
  error: {},
};

export default function contribution(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CONTRIBUTIONS:
      return {
        ...state,
        contributions: payload,
        loading: false,
      };
    case ADD_CONTRIBUTION:
      return {
        ...state,
        contributions: [...state.contributions, payload],
        loading: false,
      };
    case CONTRIBUTION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
