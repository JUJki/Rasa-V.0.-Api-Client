import {requester} from "../lib/requester";

/**
 * Replace the currently loaded model
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
const putModelRasa = async (request, response) => {
  const result = await requester('update', request.get('project'), {model:request.get('model')});
  response.setHeader('Content-Type', 'application/json');
  response.send(result);
}

module.exports = {
  deleteModelRasa
}
