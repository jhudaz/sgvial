import { combineReducers } from 'redux-immutablejs';
import { reducer as form } from 'redux-form/immutable'; 
import reducerApp from './reducerApp';

export default combineReducers({
  reducerApp,
  form
})
