import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import StoreReducer from './StoreReducer';
import PetReducer from './PetReducer';
import BackpackReducer from './BackpackReducer';

export default combineReducers({
  auth: AuthReducer,
  store: StoreReducer,
  pet: PetReducer,
  backpack: BackpackReducer
});
