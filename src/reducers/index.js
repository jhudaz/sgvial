import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import reducerApp from './reducerApp';

export default combineReducers({
  reducerApp,
  form: formReducer
})
