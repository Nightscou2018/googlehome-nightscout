'use strict';

var handler = function (assistant) {
    console.log('uploader battery');
    let inputPrompt = assistant.buildInputPrompt(true, '<speak>You said, ' +
        assistant.getRawInput() + '</speak>',
        noInput);
    assistant.ask(inputPrompt);
}

exports.handler = handler;