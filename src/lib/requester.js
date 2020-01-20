require('dotenv').config({path: './.env'});
const R = require('ramda');
const rp = require('request-promise');

const actions = {
  train: {
    method: 'POST',
    uri: '/train'
  },
  evaluate: {
    method: 'POST',
    uri: '/evaluate'
  },
  parse: {
    method: 'POST',
    uri: '/parse'
  },
  status: {
    method: 'GET',
    uri: '/status'
  },
  version: {
    method: 'GET',
    uri: '/version'
  },
  config: {
    method: 'GET',
    uri: '/config'
  },
  delete: {
    method: 'DELETE',
    uri: '/models'
  },
  update: {
    method: 'PUT',
    uri: '/model'
  }
}

const requester = (endpoint, queryParams, body, timeout) => {
  const conf = {
    baseUrl: process.env.RASA_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    qs: queryParams,
    timeout: timeout || 20000
  }
  const payload = actions[endpoint];
  return new Promise((resolve, reject) => {
    if (['POST', 'PUT'].indexOf(payload.method) !== -1) {
        payload.body = JSON.stringify(body)
    }
    rp(R.mergeDeepRight(conf,payload))
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
}
module.exports = {
  requester
};
