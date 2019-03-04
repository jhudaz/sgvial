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
  console.log('id: ',id);
  return dispatch => {
    return axios
      .get(`${url}/`, { params: { id } })
      .then(res => {
        dispatch ({
          type:'USER',
          payload:res.data
        })
      })
      .catch(err => {
        throw err
      })
}
}

//POST
export function createUser(id, name, username, email, city) {
  console.log('datos para guardar: ', name, username, email, city)
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
export function updateUser(id, name, username, email, city) {
  return dispatch => {
    return axios
      .put(`${url}/`, { id, name, username, email, city })
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
      .delete(`${url}/`, { data: { id } })
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
