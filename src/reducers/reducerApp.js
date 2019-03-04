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
    default:
      return state;
  }
}