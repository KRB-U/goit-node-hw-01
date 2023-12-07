const path = require("path");

function absolutePath(folderName, fileName) {
  const projectDir = process.cwd();
  const contactsPath = path.join(projectDir, folderName, fileName);
  return contactsPath;
}

module.exports = absolutePath;
