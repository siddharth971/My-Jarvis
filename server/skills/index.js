const browser = require("./browser");
const system = require("./system");
const general = require("./general");

module.exports = async function runSkill(nlpResult, originalText) {
  const { intent, entities, confidence } = nlpResult;

  // low confidence → fallback
  if (!intent || confidence < 0.4) {
    return general.fallback(originalText);
  }

  switch (intent) {
    case "greeting":
      return general.greeting();

    case "open_youtube":
      return browser.openYoutube();

    case "search_youtube":
      return browser.openUrl(
        "https://www.youtube.com/results?search_query=" +
          encodeURIComponent(entities?.query || originalText)
      );

    case "tell_time":
      return general.tellTime();
    case "open_website":
      return browser.openWebsite(entities);
      
    case "ask_which_website":
      return "Which website should I open, sir?";

    case "take_screenshot":
      return await system.takeScreenshot();

    default:
      return general.fallback(originalText);
  }
};
