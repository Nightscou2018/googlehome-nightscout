'use strict';

var handler = function (assistant) {
   console.log('currentMetric');
   let inputPrompt = assistant.buildInputPrompt(true, '<speak>You said, ' +
        assistant.getRawInput() + 'current metric</speak>',
        noInput);
    assistant.ask(inputPrompt);
}

exports.handler = handler;