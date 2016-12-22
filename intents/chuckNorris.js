'use strict';

let request = require('request');

var handler = function (assistant) {
    console.log('chuckNorris');
    request('http://api.icndb.com/jokes/random?exclude=%5Bexplicit%5D', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let inputPrompt = assistant.buildInputPrompt(true, '<speak>' +
                JSON.parse(response.body).value.joke + '</speak>', noInput);
            assistant.ask(inputPrompt);
        }
        else {
            let inputPrompt = assistant.buildInputPrompt(true
                , '<speak>Sorry, I\'m having trouble getting a joke right now.  Try again.</speak>'
                , noInput);
            assistant.ask(inputPrompt);
        }
    })
}

exports.handler = handler;