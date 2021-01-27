import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_CONTRIBUTIONS,
  ADD_CONTRIBUTION,
  CONTRIBUTION_ERROR
} from './types';

export const getContributions = topicId => async dispatch => {
  try {
    const contributions = await axios.get(`/api/contributions`);
    const res = contributions.data.filter(contribution => contribution.topic.id === topicId)
    dispatch({
      type: GET_CONTRIBUTIONS,
      payload: res
    });
  } catch (err) {
    dispatch({
      type: CONTRIBUTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

export const addContribution = (groupId, topicId, formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post(`/api/contributions/${groupId}/topic/${topicId}`, formData, config);

    dispatch({
      type: ADD_CONTRIBUTION,
      payload: res.data
    });
    
    dispatch(setAlert('Contribution has been added', 'success'));

  } catch (err) {
    dispatch({
      type: CONTRIBUTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}