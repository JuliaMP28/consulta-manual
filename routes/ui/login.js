import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    const data = {
        logged: false
    }
    res.render('login', data);
});

export default router;