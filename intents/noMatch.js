'use strict';

function noMatch(assistant) {
  phrases = ["I\u0027m sorry. I\u0027m having trouble understanding the question.",
    "I think I may have misunderstood your last statement.",
    "I\u0027m sorry. I didn\u0027t quite grasp what you just said.",
    "I don\u0027t think I\u0027m qualified to answer that yet.",
    "I\u0027m a bit confused by that last part.",
    "I\u0027m not totally sure about that.",
    "I\u0027m not sure I follow.",
    "I\u0027m afraid I don\u0027t understand.",
    "I\u0027m a bit confused."];
}

function configure() {
  return {
    noMatch: noMatch
  };
}
modules.exports = configure;
