import jwt from 'jsonwebtoken';
require('dotenv').config();

module.exports = (req, res, next) => {

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid User ID';
    } else {
      req.body.userId = userId;
      next();
    }

  } catch (error) {
    res.status(401).json({
      status: 'Invalid Request!',
      error: error || error.message,
    });
  }
};
