'use strict';

function currentMetric(assistant) {
  assistant.tell('current metric');
}

function configure() {
  return {
    currentMetric: currentMetric
  };
}
modules.exports = configure;
