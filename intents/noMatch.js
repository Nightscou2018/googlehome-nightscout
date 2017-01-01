'use strict';

var handler = function (assistant, isDeepLink) {
  console.log('noMatch');
  // assume this is called as part of an ongoing conversation
  if (typeof isDeepLink === 'undefined') {
    let isDeepLink = false;
  }

  let phrases = ["I\u0027m sorry. I\u0027m having trouble understanding the question.",
    "I think I may have misunderstood your last statement.",
    "I\u0027m sorry. I didn\u0027t quite grasp what you just said.",
    "I don\u0027t think I\u0027m qualified to answer that yet.",
    "I\u0027m a bit confused by that last part.",
    "I\u0027m not totally sure about that.",
    "I\u0027m not sure I follow.",
    "I\u0027m afraid I don\u0027t understand.",
    "I\u0027m a bit confused."];
  
  let pickRandomPhrase = Math.floor(Math.random() * (phrases.length));

  let phrase = '<speak>' + phrases[pickRandomPhrase] + '</speak>';

  // use tell() instead of ask() if deep link query
  if (isDeepLink === true) {
    assistant.tell(phrase);
  }
  else {
    let inputPrompt = assistant.buildInputPrompt(true, phrase, noInput);
    assistant.ask(inputPrompt);
  }
}

var deepLink = function (assistant) {
  console.log('deepLink noMatch');
  handler(assistant, true);
}

exports.deepLink = deepLink;
exports.handler = handler;
