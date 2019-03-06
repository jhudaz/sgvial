
//import { Map as map } from 'immutable';

function getInitialState() {
  return {
    users: []
  }
}
export default function (state = getInitialState(), action) {
  let users = null
  switch (action.type) {
    case 'LIST':
      return {
        ...state,
        users: action.payload
      }
    case 'CREATE':
      users = state.users.slice(0);
      users.push({
        ...action.payload,
        id: users[users.lenght]+1,
        address: {
          city: action.payload.city
        }
      })
      return {
        ...state,
        users
      }
    case 'UPDATE':
      let positionToEdit = state.users.findIndex(e => e.id === action.payload.id);
      users = state.users.slice(0);
      action.payload.address = { city: action.payload.city };
      users[positionToEdit] = action.payload;
      return {
        ...state,
        users
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
