//import { Map as map } from 'immutable';

function getInitialState() {
  return {
    users: [],
    user: {}
  }
}
export default function (state = getInitialState(), action) {
  switch (action.type) {
    case 'LIST':
      return {
        ...state,
        users: action.payload
      }
    case 'USER':
      return {
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
}