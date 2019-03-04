import axios from 'axios';

export function createList(){
  return dispatch => {
    return axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(res =>{
        dispatch({
          type:'LIST',
          payload:res.data
        })
      })
      .catch(err =>{
        throw err;
      })
  }
}
