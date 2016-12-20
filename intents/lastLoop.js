'use strict';

var handler = function (assistant) {
   console.log('last loop');
   let inputPrompt = assistant.buildInputPrompt(true, '<speak>You said, ' +
        assistant.getRawInput(),
        []);
    assistant.ask(inputPrompt);
}

exports.handler = handler;