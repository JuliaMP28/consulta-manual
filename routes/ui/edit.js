import express from 'express';
import Manual from '../../models/manual.js';

import authenticateToken from '../../auth/auth.js';

const router = express.Router();

// PUT route to edit manual
router.get('/', authenticateToken, (req, res) => {

    const { admin } = req.user;

    // get id from query parameters
    const { id } = req.query;

    if (admin !== true) {
        return res.sendStatus(401); // Unauthorized
    }

    // find id in database
    Manual.findById(id)
        .lean()
        .then((manual) => {
            const data = {
                logged: true,
                user: req.user,
                manual: manual
            }
            res.render('edit', data);
        })
        .catch((error) => {
            console.error('Error finding manual:', error);
        });


});
    

export default router;