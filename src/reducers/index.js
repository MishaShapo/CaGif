import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PetReducer from './PetReducer';
import BackpackReducer from './BackpackReducer';

export default combineReducers({
  auth: AuthReducer,
  pet: PetReducer,
  backpack: BackpackReducer
});
