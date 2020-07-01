import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './Profile';

export default combineReducers({ alert, auth, profile });
