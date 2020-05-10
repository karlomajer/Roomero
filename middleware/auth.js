const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'Authorization denied, no token provided' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    req.profile = decoded.profile;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
