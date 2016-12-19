'use strict';

function help(assistant) {
  response = 'I can give you information about your Nightscout monitor.' +
    'Try asking me what your current blood glucose is.';
  assistant.tell(response);
}

function configure() {
  return {
    help: help
  };
}

modules.exports = configure;
