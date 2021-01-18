import axios from 'axios';
import { setAlert } from './alert';

import { ADD_GROUP, GROUP_ERROR, GET_GROUP, GET_GROUPS } from './types';

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
    console.log('trying')
    console.log(res)
    
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