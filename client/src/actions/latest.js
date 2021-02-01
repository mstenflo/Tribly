import axios from 'axios';
import { GET_LATEST, LATEST_ERROR } from './types';

export const getLatest = () => async dispatch => {
  try {
    const res = await axios.get(`/api/latest`);

    dispatch({
      type: GET_LATEST,
      payload: res.data.reverse()
    });
  } catch (err) {
    dispatch({
      type: LATEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}