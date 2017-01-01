'use strict';

var handler = function (assistant, isDeepLink) {
  console.log('pumpBattery');
  // assume this is called as part of an ongoing conversation
  if (typeof isDeepLink === 'undefined') {
    let isDeepLink = false;
  }

  let phrase = '<speak>You said, ' + assistant.getRawInput() +
    'current metric</speak>';

  // use tell() instead of ask() if deep link query
  if (isDeepLink === true) {
    assistant.tell(phrase);
  }
  else {
    let inputPrompt = assistant.buildInputPrompt(true, phrase, noInput);
    assistant.ask(inputPrompt);
  }
}

var deepLink = function (assistant) {
  console.log('deepLink pumpBattery');
  handler(assistant, true);
}

exports.deepLink = deepLink;
exports.handler = handler;
