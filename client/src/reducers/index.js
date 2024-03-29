import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import group from './group';
import contribution from './contribution';
import topic from './topic';
import latest from './latest';

export default combineReducers({
  alert,
  auth,
  profile,
  group,
  contribution,
  topic,
  latest,
});
