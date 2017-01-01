import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PetReducer from './PetReducer';

export default combineReducers({
  auth: AuthReducer,
  pet: PetReducer
});
