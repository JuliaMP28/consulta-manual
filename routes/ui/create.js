import express from 'express';
import authenticateToken from '../../auth/auth.js';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
    const data = {
        logged: true,
        user: req.user
    }
    res.render('create', data);
});

export default router;