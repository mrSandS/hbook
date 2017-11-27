const hostname = 'http://10.0.2.2:3000';

export default {
  hostname,
  endpoints: {
    notes: {
      list: {
        path: hostname + '/notes',
        method: 'GET'
      },
      create: {
        path: hostname + '/notes',
        method: 'POST'
      },
      update: {
        path: hostname + '/notes',
        method: 'PUT'
      },
      delete: {
        path: hostname + '/notes',
        method: 'DELETE'
      },
    },
    auth: {
      login: {
        path: hostname + '/auth/login',
        method: 'POST'
      },
      signup: {
        path: hostname + '/auth/signup',
        method: 'POST'
      },
      dash: {
        path: hostname + '/api/dashboard',
        method: 'GET'
      },
    }
  },
};