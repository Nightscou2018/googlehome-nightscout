'use strict';

var handler = function (assistant) {
   console.log('insulin remaining');
   let inputPrompt = assistant.buildInputPrompt(true, '<speak>You said, ' +
        assistant.getRawInput(),
        []);
    assistant.ask(inputPrompt);
}

exports.handler = handler;