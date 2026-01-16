module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, data } = req.body;
  if (!type || !data) {
    return res.status(400).json({ error: 'Type and data required' });
  }

  try {
    // For now, just log the data. In a real app, save to database or file.
    console.log('Upload:', type, data);

    // Simulate success
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};