import { combineReducers } from 'redux';
import authReducer from '../Containers/AppWrapper/reducer';

export default combineReducers({
    auth: authReducer,
});