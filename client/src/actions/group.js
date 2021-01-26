import axios from 'axios';
import { setAlert } from './alert';

import {
  ADD_GROUP,
  GROUP_ERROR,
  GET_GROUP,
  GET_GROUPS,
  ADD_GROUP_COMMENT,
  ADD_GROUP_TOPIC,
  ADD_CONTRIBUTION
} from './types';

export const getGroups = () => async dispatch => {
  try {
    const res = await axios.get(`/api/groups`);

    dispatch({
      type: GET_GROUPS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

export const getGroup = id => async dispatch => {
  try {
    const res = await axios.get(`/api/groups/${id}`);

    dispatch({
      type: GET_GROUP,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

export const getUsersGroups = id => async dispatch => {
  try {
    const groups = await axios.get(`/api/groups`);
    const res = groups.filter(group => group._id === id)
    
    dispatch({
      type: GET_GROUPS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

export const createGroup = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/groups', formData, config);

    dispatch({
      type: ADD_GROUP,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Group updated' : 'Group Created', 'success'));

    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

export const addComment = (id, comment, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post(`/api/groups/${id}/comment`, { comment }, config);

    dispatch({
      type: ADD_GROUP_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment added', 'success'));
    history.push(`/group/${id}`)
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

export const addTopic = (id, formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post(`/api/groups/${id}/topic`, formData, config);

    dispatch({
      type: ADD_GROUP_TOPIC,
      payload: res.data
    });

    dispatch(setAlert('Topic added', 'success'));

    history.push(`/group/${id}`);
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

export const addContribution = (groupId, topicId, formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post(`/api/groups/${groupId}/topic/${topicId}/contribution`, formData, config);

    dispatch({
      type: ADD_CONTRIBUTION,
      payload: res.data
    });

    dispatch(setAlert('Contribution has been added', 'success'));

    history.push(`/group/${groupId}`);
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}