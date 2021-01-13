import axios from 'axios';
import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERROR, ADD_AVATAR, UPLOAD_ERROR } from './types';

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
}

export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
}

export const addAvatar = (formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    console.log('trying', formData)
    const file = formData.profilepic
    console.log(file);
    console.log(file.name)
    // file.name = `photo_${profile._id}${path.parse(file.name).ext}`
    console.log(file.data)
    const res = await axios.post('/api/profile/photo', formData, config);
    
    dispatch({
      type: ADD_AVATAR,
      payload: res.data
    });
    
    dispatch(setAlert('Photo added!', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: UPLOAD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}