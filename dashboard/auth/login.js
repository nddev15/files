const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password required' });
  }

  // Simple password check (change this to your actual password)
  const correctPassword = 'admin123'; // Replace with your password

  if (password === correctPassword) {
    // Set a simple cookie for authentication
    res.setHeader('Set-Cookie', 'admin_token=authenticated; Path=/; HttpOnly; Max-Age=3600'); // 1 hour
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false });
  }
};