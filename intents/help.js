'use strict';

var handler = function (assistant) {
    console.log('help');
    let phrase = 'I can give you information about your Nightscout monitor.'
        + 'Try asking me what your current blood glucose is.';
    let inputPrompt = assistant.buildInputPrompt(true, '<speak>' + 
      phrase + '</speak>', []);
    assistant.ask(inputPrompt);
}

exports.handler = handler;