function getInitialState() {
  return {
    comments: []
  }
}
export default function (state = getInitialState(), action) {
  switch (action.type) {
    case 'LIST':
      return {
        ...state,
        comments: action.payload
      }
    default:
      return state;
  }
}