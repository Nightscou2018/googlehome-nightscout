// Copyright 2016, Google, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START app]
'use strict';

process.env.DEBUG = 'actions-on-google:*';

let ActionsSdkAssistant = require('actions-on-google').ActionsSdkAssistant;
let express = require('express');
let bodyParser = require('body-parser');

// Load intent handlers
var currentMetric = require('./intents/currentMetric')
  , finish = require('./intents/finish')
  , help = require('./intents/help')
  , insulinRemaining = require('./intents/insulinRemaining')
  , lastLoop = require('./intents/lastLoop')
  , noMatch = require('./intents/noMatch')
  , pumpBattery = require('./intents/pumpBattery')
  , uploaderBattery = require('./intents/uploaderBattery')();

// Define intents
const CURRENT_METRIC = 'CURRENT_METRIC';
const FINISH = 'FINISH';
const HELP = 'HELP';
const INSULIN_REMAINING = 'INSULIN_REMAINING';
const LAST_LOOP = 'LAST_LOOP';
const NO_MATCH = 'NO_MATCH';
const PUMP_BATTERY = 'PUMP_BATTERY';
const UPLOADER_BATTERY = 'UPLOADER_BATTERY';


let app = express();
app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.json({ type: 'application/json' }));

app.post('/', function (request, response) {  
  console.log('handle post');
  const assistant = new ActionsSdkAssistant({ request: request, response: response });

  function mainIntent(assistant) {
    console.log('mainIntent');
    let inputPrompt = assistant.buildInputPrompt(true, '<speak>Hi, this is Nightscout! ' +
      'What can I help you with? </speak>',
      ['I didn\'t hear anything', 'You can say help to learn more',
        'Try asking me what your current blood glucose is']);
    assistant.tell(inputPrompt);
  }

  function rawInput(assistant) {
    console.log('rawInput');
    if (assistant.getRawInput() === 'bye') {
      assistant.tell('Goodbye!');
    } else {
      let inputPrompt = assistant.buildInputPrompt(true, '<speak>You said, <say-as interpret-as="ordinal">' +
        assistant.getRawInput() + '</say-as></speak>',
        ['I didn\'t hear a number', 'If you\'re still there, what\'s the number?', 'What is the number?']);
      assistant.ask(inputPrompt);
    }
  }

  let actionMap = new Map();
  actionMap.set(assistant.StandardIntents.MAIN, mainIntent);
  actionMap.set(CURRENT_METRIC, currentMetric);
  actionMap.set(FINISH, finish);
  actionMap.set(HELP, help);
  actionMap.set(INSULIN_REMAINING, insulinRemaining);
  actionMap.set(LAST_LOOP, lastLoop);
  actionMap.set(PUMP_BATTERY, pumpBattery);
  actionMap.set(UPLOADER_BATTERY, uploaderBattery);
  actionMap.set(assistant.StandardIntents.TEXT, rawInput);
  
  assistant.handleRequest(actionMap);
});

// Start the server
let server = app.listen(app.get('port'), function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});
// [END app]
