import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/users';

//GET
export function createList() {
  return dispatch => {
    return axios
      .get(url)
      .then(res => {
        dispatch({
          type: 'LIST',
          payload: res.data
        })
      })
      .catch(err => {
        throw err;
      })
  }
}

//POST
export function createUser(params) {
  return dispatch => {
    return axios
      .post(`${url}`, params)
  }
}
//UPDATE
export function updateUser(params) {
  return dispatch => {
    return axios
      .put(`${url}/${params.id}`, params)
  }
}
//DELETE
export function deleteUser(id) {
  return dispatch => {
    return axios
      .delete(`${url}/${id}`)
  }
}
