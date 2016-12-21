'use strict';

let thingspeak = require('thingspeakclient');
let client = new thingspeak();

var handler = function (assistant) {
  console.log('temphum');
  // Die if THINGSPEAK_[KEY|CHANNELID] not defined
  if (typeof process.env.THINGSPEAK_KEY === 'undefined' ||
    process.env.THINGSPEAK_KEY === '' ||
    typeof process.env.THINGSPEAK_CHANNELID === 'undefined' ||
    process.env.THINGSPEAK_CHANNELID === '') {
    console.log('error: THINGSPEAK_KEY or THINGSPEAK_CHANNELID not set');
    let inputPrompt = assistant.buildInputPrompt(true,
      '<speak> It looks like your thing speak API key or channel ID aren\'t set.</speak>',
      noInput);
    assistant.ask(inputPrompt);
  }
  else {
    client.getLastEntryInChannelFeed(process.env.THINGSPEAK_CHANNELID, { api_key: process.env.THINGSPEAK_KEY },
      function (error, response) {
        let temp = response['field1'];
        let humidity = response['field2'];
        let inputPrompt = assistant.buildInputPrompt(true,
          '<speak> Attic is currently ' + temp + ' degrees, ' +
          'with humidity at ' + humidity + 'percent</say-as></speak>',
          noInput);
        assistant.ask(inputPrompt);
      });
  }
}

exports.handler = handler;
