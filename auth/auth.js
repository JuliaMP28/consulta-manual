import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const secretKey = config()['secret']; // Replace with your secret key

const authenticateToken = (req, res, next) => {
  const token = req.cookies['token'];

  if (!token) {
    return res.render('login', {logged: false}); 
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.render('login', {logged: false}); 
    }

    req.user = user; 
    next();
  });
};

export default authenticateToken;