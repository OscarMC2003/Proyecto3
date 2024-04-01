const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send('Access Denied: No Token Provided!');
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // El payload del token está ahora en req.user
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
}

module.exports = authenticate;

