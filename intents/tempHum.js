'use strict';

let thingspeak = require('thingspeakclient');
let client = new thingspeak();

var handler = function (assistant, isDeepLink) {
  console.log('tempHum');
  // assume this is called as part of an ongoing conversation
  if (typeof isDeepLink === 'undefined') {
    let isDeepLink = false;
  }

  let phrase = '';

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
    if (typeof process.env.THINGSPEAK_CHANNELID === 'string') {
      var CHANNELID = parseInt(process.env.THINGSPEAK_CHANNELID);
    }
    else {
      var CHANNELID = process.env.THINGSPEAK_CHANNELID;
    }
    client.getLastEntryInChannelFeed(CHANNELID, { api_key: process.env.THINGSPEAK_KEY },
      function (error, response) {
        console.log('thingspeak status or error = ' + error);
        if (!error) {
          let temp = response['field1'];
          let humidity = response['field2'];
          phrase = '<speak> Attic is currently ' + temp + ' degrees, ' +
            'with humidity at ' + humidity + 'percent</speak>';
        }
        else {
          phrase = '<speak>Thingspeak didn\'t respond. ' + error + '</speak>';
        }
        // use tell() instead of ask() if deep link query
        if (isDeepLink === true) {
          assistant.tell(phrase);
        }
        else {
          let inputPrompt = assistant.buildInputPrompt(true, phrase, noInput);
          assistant.ask(inputPrompt);
        }
      });
  }

}

var deepLink = function (assistant) {
  console.log('deepLink tempHum');
  handler(assistant, true);
}

exports.deepLink = deepLink;
exports.handler = handler;
