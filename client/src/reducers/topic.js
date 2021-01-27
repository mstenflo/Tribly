import {
  ADD_TOPIC_COMMENT, GET_TOPIC_DATA
} from '../actions/types';

const initialState = {
  topic: { comments: [] },
  loading: false,
  error: {}
};

export default function topic(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TOPIC_COMMENT:
      return {
        ...state,
        topic: {
          ...state.topic,
          comments: [payload, ...state.topic.comments]
        },
        loading: false
      }
    case GET_TOPIC_DATA:
      return {
        ...state,
        topic: payload
      }
    default:
      return state;
  }
}