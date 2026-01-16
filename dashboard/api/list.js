const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      arrayOfFiles.push(fullPath.replace(/\\/g, '/').replace(/^.*?\//, '')); // relative path
    }
  });

  return arrayOfFiles;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const rootDir = path.join(__dirname, '..');
    const files = getAllFiles(rootDir).map(f => ({ path: f }));

    return res.status(200).json({ files });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};