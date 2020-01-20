import {requester} from '../lib/requester';

const trainRasaModel = async (request, response) => {
  const body = {
    'language': 'fr',
    'pipeline': 'tensorflow_embedding',
    'data': {
      rasa_nlu_data: {
        "common_examples": [{
          "text": "hey",
          "intent": "greet",
          "entities": []
        }, {
          "text": "i'm looking for a place in the north of town",
          "intent": "restaurant_search",
          "entities": [
            {
              "start": 31,
              "end": 36,
              "value": "north",
              "entity": "location"
            }
          ]
        }],
        "regex_features": [],
        "lookup_tables": [],
        "entity_synonyms": []
      }
    }
  };
  const queryParams = {
    project: request.body.project
  };
  const result = await requester('train', queryParams, body);
  response.setHeader('Content-Type', 'application/json');
  response.send(result);
}
const evaluateRasaModel = async (request, response) => {
  const body = {
    rasa_nlu_data: {
      "common_examples": [
        {
          "text": "hey",
          "intent": "greets",
          "entities": []
        },
        {
          "text": "hey",
          "intent": "greet",
          "entities": []
        },
        {
          "text": "ho",
          "intent": "greet",
          "entities": []
        },
        {
          "text": "bonjour",
          "intent": "5d95b3297e9d2",
          "entities": []
        },
        {
          "text": "coucou",
          "intent": "greets",
          "entities": []
        }
      ],
      "regex_features": [],
      "lookup_tables": [],
      "entity_synonyms": []
    }
  };
  const queryParams = {
    project: request.body.project,
    model: request.body.model
  };
  const result = await requester('evaluate', queryParams, body);
  response.setHeader('Content-Type', 'application/json');
  response.send(result);
}
const parseRasaModel = async (request, response) => {
  const body = {
    q: request.body.text,
    project: request.body.project,
    model: request.body.model
  }
  const queryParams = {};
  const result = await requester('parse', queryParams, body);
  response.setHeader('Content-Type', 'application/json');
  response.send(result);
}
module.exports = {
  trainRasaModel,
  evaluateRasaModel,
  parseRasaModel
}
