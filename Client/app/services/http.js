const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};
const DEFAULT_CREDENTIALS = 'omit';
const DEFAULT_CACHE = 'default';

class HttpService {
  authToken = null;

  fetch(point, body, options = {}) {
    const {path, method} = point;

    const {
      headers = DEFAULT_HEADERS,
      credentials = DEFAULT_CREDENTIALS,
      cache = DEFAULT_CACHE
    } = options;
    
    const requestOptions = {
      method,
      headers,
      credentials,
      cache
    };

    if (this.authToken) {
      requestOptions.headers.Authorization = this.authToken;
    } else {
      requestOptions.headers.Authorization = null;
    }

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }
    console.log('HTTP path: ', path)
    return fetch(path, requestOptions)
      .then(response => {
        // console.log(response)
        const json = response.json();

        return json;
      });
  }

  setSessionToken(token) {
    this.authToken = token;
  }
}


const $http = new HttpService();

export default $http;