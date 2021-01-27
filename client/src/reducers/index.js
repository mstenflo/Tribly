import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import group from './group';
import contribution from './contribution';

export default combineReducers({
  alert,
  auth,
  profile,
  group,
  contribution
});