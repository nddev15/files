// Password Manager Module
const PasswordManager = (() => {
  let passwordCache = {};

  const loadPasswords = async () => {
    try {
      const res = await fetch('assets/config/password/password.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load passwords');
      passwordCache = await res.json();
    } catch (err) {
      console.error('Failed to load password config:', err);
      passwordCache = { v1: '', v2: '' };
    }
  };

  const getPassword = (version) => {
    return passwordCache[version] || '';
  };

  const verifyPassword = async (inputPassword, version) => {
    const expected = getPassword(version);
    return inputPassword.trim() === expected;
  };

  return {
    loadPasswords,
    getPassword,
    verifyPassword
  };
})();
