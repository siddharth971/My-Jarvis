const screenshot = require("screenshot-desktop");
const path = require("path");

module.exports.takeScreenshot = async () => {
  const filePath = path.join(__dirname, "../full-desktop.png");
  await screenshot({ filename: filePath });
  return "Screenshot captured, sir.";
};
