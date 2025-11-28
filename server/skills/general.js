module.exports.greeting = () => {
  return "Hello sir, how can I assist you today?";
};

module.exports.tellTime = () => {
  return "The current time is " + new Date().toLocaleTimeString();
};

module.exports.fallback = (text) => {
  return "I heard: " + text + ", but I'm still learning what to do.";
};
