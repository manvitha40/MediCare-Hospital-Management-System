const jwt = require('jsonwebtoken');
const mockDb = require('../utils/mockDb');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'medicare_jwt_secret_key_12345';

const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    let user;
    if (process.env.USE_MOCK_DB === 'true') {
      user = mockDb.findById('users', decoded.id);
    } else {
      user = await User.findById(decoded.id).select('-password');
    }

    if (!user) {
      return res.status(401).json({ message: 'Token is not valid (user not found)' });
    }

    req.user = {
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email
    };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!req.user || (roles.length && !roles.includes(req.user.role))) {
      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }
    next();
  };
};

module.exports = { auth, authorize, JWT_SECRET };
