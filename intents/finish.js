'use strict';

var handler = function (assistant) {
   console.log('finish');
   let inputPrompt = assistant.buildInputPrompt(true, '<speak>You said, ' +
        assistant.getRawInput() + '</speak>',
        noInput);
    assistant.ask(inputPrompt);
}

exports.handler = handler;