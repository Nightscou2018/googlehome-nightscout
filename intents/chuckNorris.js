'use strict';

let request = require('request');

var handler = function (assistant, isDeepLink) {
  console.log('chuckNorris');
  // assume this is called as part of an ongoing conversation
  if (typeof isDeepLink === 'undefined') {
    let isDeepLink = false;
  }
  let phrase = '';
  
  request('http://api.icndb.com/jokes/random', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      phrase = '<speak>' + JSON.parse(response.body).value.joke + '</speak>';
    }
    else {
      phrase = '<speak>Sorry, I\'m having trouble getting a joke ' +
        'right now.  Try again.</speak>';
    }

    // use tell() instead of ask() if deep link query
    if (isDeepLink === true) {
      assistant.tell(phrase);
    }
    else {
      let inputPrompt = assistant.buildInputPrompt(true, phrase, noInput);
      assistant.ask(inputPrompt);
    }
  })
}

var deepLink = function (assistant) {
  console.log('deepLink chuckNorris');
  handler(assistant, true);
}

exports.deepLink = deepLink;
exports.handler = handler;
