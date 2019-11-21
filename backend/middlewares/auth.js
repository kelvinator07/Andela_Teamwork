import jwt from 'jsonwebtoken';

module.exports = (req, res, next) => {

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_SECRET_TOKEN');
    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid User ID';
    } else {
      req.body.userId = userId;
      next();
    }

  } catch {
    res.status(401).json({
      error: 'Invalid Request!',
    });
  }
};
