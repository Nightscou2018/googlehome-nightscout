'use strict';

function finish(assistant) {
  assistant.tell('Goodbye!');
}

function configure() {
  return {
    finish: finish
  };
}

module.exports = configure;
