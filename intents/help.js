'use strict';

var handler = function (assistant) {
    console.log('help');
    response = 'I can give you information about your Nightscout monitor.'
        + 'Try asking me what your current blood glucose is.';
    let inputPrompt = assistant.buildInputPrompt(true, '<speak>You said, ' +
        assistant.getRawInput() + '</speak>',
        []);
    assistant.ask(inputPrompt);
}

exports.handler = handler;