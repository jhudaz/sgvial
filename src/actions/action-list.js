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
      .then(res => {
        dispatch({
          type: 'CREATE',
          payload: res.data
        })
      })
  }
}
//UPDATE
export function updateUser(params, realId) {
  console.log('data a actualizar:', params, realId)
  return dispatch => {
    return axios
      .put(`${url}/${params.id}`, params)
      .then(res => {
        res.data.id = realId;
        dispatch({
          type: 'UPDATE',
          payload: res.data
        })
      })
  }
}
//DELETE
export function deleteUser(id) {
  return dispatch => {
    return axios
      .delete(`${url}/${id}`)
      .then(() => {
        dispatch({
          type: 'DELETE',
          payload: id
        })
      })
  }
}
