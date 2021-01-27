import {
  GET_GROUP,
  ADD_GROUP,
  GROUP_ERROR,
  GET_GROUPS,
  ADD_GROUP_COMMENT,
  ADD_GROUP_TOPIC,
} from '../actions/types';

const initialState = {
  groups: [],
  group: null,
  loading: false,
  error: {}
};

export default function group(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_GROUPS:
      return {
        ...state,
        groups: payload,
        loading: false
      }
    case GET_GROUP:
      return {
        ...state,
        group: payload,
        loading: false
      }
    case ADD_GROUP:
      return {
        ...state,
        groups: [payload, ...state.groups],
        loading: false
      }
    case GROUP_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case ADD_GROUP_COMMENT:
      return {
        ...state,
        group: { 
          ...state.group,
          comments: [payload, ...state.group.comments]
        },
        loading: false
      }
    case ADD_GROUP_TOPIC:
      return {
        ...state,
        group: {
          ...state.group,
          topics: [payload, ...state.group.topics]
        },
        loading: false
      }
    default:
      return state;
  }
}