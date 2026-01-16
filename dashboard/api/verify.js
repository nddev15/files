module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check for admin_token cookie
  const cookies = req.headers.cookie || '';
  const isAuthenticated = cookies.includes('admin_token=authenticated');

  if (isAuthenticated) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ error: 'Not authenticated' });
  }
};