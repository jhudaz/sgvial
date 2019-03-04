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
//GET  user by id
export function getUser(id) {
  return dispatch => {
    return axios
      .get(`${url}/${id}`)
      .then(res => {
        dispatch({
          type: 'USER',
          payload: res.data
        })
      })
      .catch(err => {
        throw err
      })
  }
}
//POST
export function createUser(name, username, email, city) {
  return dispatch => {
    return axios
      .post(`${url}`, { name, username, email, city })
      .then(res => {
        dispatch(
          createList()
        )
      })
      .catch(err => {
        throw err
      })
  }
}
//UPDATE
export function updateUser(data) {
  return dispatch => {
    return axios
      .put(`${url}/${data.id}`, { name: data.name, username: data.userName, email: data.email, city: data.city })
      .then(res => {
        dispatch(
          createList()
        )
      })
      .catch(err => {
        throw err
      })
  }
}
//DELETE
export function deleteUser(id) {
  return dispatch => {
    return axios
      .delete(`${url}/${id}`)
      .then(res => {
        dispatch(
          createList()
        )
      })
      .catch(err => {
        throw err
      })
  }
}
