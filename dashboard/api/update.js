const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { path: filePath, content, message } = req.body;
  if (!filePath) {
    return res.status(400).json({ error: 'Path required' });
  }

  try {
    const fullPath = path.join(__dirname, '..', filePath);
    fs.writeFileSync(fullPath, content || '', 'utf8');
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};