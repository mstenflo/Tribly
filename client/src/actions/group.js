import axios from 'axios';
import { setAlert } from './alert';

import {
  ADD_GROUP,
  GROUP_ERROR,
  GET_GROUP,
  GET_GROUPS,
  ADD_GROUP_COMMENT,
  ADD_GROUP_TOPIC,
  ADD_TOPIC_COMMENT,
  GET_TOPIC_DATA,
} from './types';

export const getGroups = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/groups`);

    dispatch({
      type: GET_GROUPS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getGroup = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/groups/${id}`);

    dispatch({
      type: GET_GROUP,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getUsersGroups = (id) => async (dispatch) => {
  try {
    const groups = await axios.get(`/api/groups`);
    const res = groups.filter((group) => group._id === id);

    dispatch({
      type: GET_GROUPS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createGroup =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post('/api/groups', formData, config);

      const latest = {
        type: 'newgroup',
        data: res.data,
      };

      await axios.post('/api/latest', latest, config);

      dispatch({
        type: ADD_GROUP,
        payload: res.data,
      });

      dispatch(setAlert(edit ? 'Group updated' : 'Group Created', 'success'));

      history.push('/dashboard');
    } catch (err) {
      dispatch({
        type: GROUP_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

export const addComment = (group, topic, comment) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (topic._id) {
      const res = await axios.post(
        `/api/groups/${group._id}/topic/${topic._id}/comment`,
        { comment },
        config
      );

      const latest = {
        type: 'topiccomment',
        data: { comment: res.data, group, topic },
      };

      await axios.post('/api/latest', latest, config);

      dispatch({
        type: ADD_TOPIC_COMMENT,
        payload: res.data,
      });
    } else {
      const res = await axios.post(
        `/api/groups/${group._id}/comment`,
        { comment },
        config
      );

      const latest = {
        type: 'groupcomment',
        data: { comment: res.data, group },
      };

      await axios.post('/api/latest', latest, config);

      dispatch({
        type: ADD_GROUP_COMMENT,
        payload: res.data,
      });
    }

    dispatch(setAlert('Comment added', 'success'));
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addTopic = (group, formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      `/api/groups/${group._id}/topic`,
      formData,
      config
    );

    const latest = {
      type: 'newtopic',
      data: { topic: res.data, group },
    };

    await axios.post('/api/latest', latest, config);

    dispatch({
      type: ADD_GROUP_TOPIC,
      payload: res.data,
    });

    dispatch(setAlert('Topic added', 'success'));

    history.push(`/group/${group._id}`);
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getTopicData = (groupId, topicId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/groups/${groupId}/topic/${topicId}`);

    dispatch({
      type: GET_TOPIC_DATA,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
