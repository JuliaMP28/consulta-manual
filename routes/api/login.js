import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config/config.js';

const router = express.Router();

const secretKey = config()['secret'];
const users = config()['users'];

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.sendStatus(401); // Unauthorized
  }

  const token = jwt.sign({ id: user.id, username: user.username, admin: user.admin, hasRestrictedAccess: user.hasRestricctedAcess }, secretKey);
  res.json({ token, username: user.username, admin: user.admin, hasRestricctedAcess: user.hasRestricctedAcess });
});

export default router;