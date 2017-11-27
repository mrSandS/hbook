import $http from './http';
import constants from './constants';

const {
	endpoints: {
		notes,
		auth
	}
} = constants;


const listNotes = (cb) => {
  return $http.fetch(notes.list)
    .then(json => {
      console.log('JSON: ', json)
      return json.error ?
        Promise.reject(json.error) :
        json;
    })
    .then(res => {
      console.log('List Notes Response: ', res)
      cb(res);
    })
};

const createNote = (body, cb) => {
  console.log('API CREATE BODY: ', body)
  return $http.fetch(notes.create, body)
    .then(json => {
      return json.error ?
        Promise.reject(json.error) :
        json;
    })
    .then(res => {
      console.log('Create Note Response: ', res)
      cb(res)
    })
};

const updateNote = (body, id, cb) => {
  let endpoint = {...notes.update};
  endpoint.path = endpoint.path + '/' + id;
  return $http.fetch(endpoint, body)
    .then(json => {
      return json.error ?
        Promise.reject(json.error) :
        json;
    })
    .then(res => {
      console.log('Update Note Response: ', res)
      cb(res)
    })
};

const deleteNote = (id, cb) => {
  let endpoint = {...notes.delete};
  endpoint.path = endpoint.path + '/' + id;

  return $http.fetch(endpoint)
    .then(json => {
      return json.error ?
        Promise.reject(json.error) :
        json;
    })
    .then(res => {
      console.log('Delete Note Response: ', res);
      cb(res);
    })
};

const authLogin = (body) => {
  return $http.fetch(auth.login, body)
    .then(json => {
      return json.error ?
        Promise.reject(json.error) :
        json;
    })
};

const authSignup = (body) => {
  return $http.fetch(auth.signup, body)
    .then(json => {
      return json.error ?
        Promise.reject(json.error) :
        json;
    });
};
const authDash = () => {
  return $http.fetch(auth.dash)
    .then(json => {
      return json.error ?
        Promise.reject(json.error) :
        json;
    });
};

export default {
  listNotes,
  createNote,
  updateNote,
  deleteNote,
  authLogin,
  authSignup,
  authDash
};