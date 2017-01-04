import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import StoreReducer from './StoreReducer';
// import PetReducer from './PetReducer';

export default combineReducers({
  auth: AuthReducer,
  store: StoreReducer
});
