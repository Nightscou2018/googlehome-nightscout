'use strict';

var handler = function (assistant) {
   console.log('finish');
   let inputPrompt = assistant.buildInputPrompt(true, '<speak>You said, ' +
        assistant.getRawInput() + '</speak>',
        []);
    assistant.ask(inputPrompt);
}

exports.handler = handler;