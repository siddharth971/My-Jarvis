const { exec } = require("child_process");

module.exports.openYoutube = () => {
  exec(`start https://www.youtube.com`);
  return "Opening YouTube, sir.";
};




module.exports.openWebsite = ({ url }) => {
  exec(`start ${url}`);
  return `Opening ${url}, sir.`;
};
