'use strict';

var handler = function (assistant) {
   console.log('currentMetric');
   let inputPrompt = assistant.buildInputPrompt(true, '<speak>You said, ' +
        assistant.getRawInput() + 'current metric</speak>',
        []);
    assistant.ask(inputPrompt);
}

exports.handler = handler;