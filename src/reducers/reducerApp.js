//import { Map as map } from 'immutable';

function getInitialState() {
  return {
    users: []
  }
}
export default function (state = getInitialState(), action) {
  switch (action.type) {
    case 'LIST':
      return {
        ...state,
        users: action.payload
      }
    case 'DELETE':
      return {
        ...state,
        users: state.users.filter(i => i.id !== action.payload)
      }
    default:
      return state;
  }
}