import express from 'express';
import Manual from '../../models/manual.js';
import authenticateToken from '../../auth/auth.js';
import validationRules from '../../validators/manual-rules.js';
import handleValidationErrors from '../../validators/validator.js';

const router = express.Router();

router.post('/manual', authenticateToken, validationRules, handleValidationErrors, (req, res) => {

    console.log(req.body)
    console.log(req.user)

    const { username, admin } = req.user;
    
    if (admin !== true) {
        return res.sendStatus(401); // Unauthorized
    }
    
    const manual = new Manual({
        name: req.body.name,
        link: req.body.link,
        model: req.body.model,
        manufacturer: req.body.manufacturer,
        type: req.body.type,
        createdBy: username,
        isRestricted: req.body.isRestricted,
        createdAt: Date.now()
    });
    
    manual.save()
    .then((user) => {
        console.log('User saved:', user);
    })
    .catch((error) => {
        console.error('Error saving user:', error);
    });
    res.sendStatus(201); // Created
});

// create get by id method
router.get('/manual/:id', authenticateToken, (req, res) => {
    Manual.findById(req.params.id)
    .then((manual) => {
        res.json(manual);
    })
    .catch((error) => {
        console.error(error);
        res.sendStatus(404); // Not Found
    });
});

router.delete('/manual/:id', authenticateToken, (req, res) => {
        const { admin } = req.user;
        
        if (admin !== true) {
            return res.sendStatus(401); // Unauthorized
        }
        
        Manual.findByIdAndDelete(req.params.id)
        .then((user) => {
            console.log('User saved:', user);
        })
        .catch((error) => {
            console.error('Error saving user:', error);
        });
        // send delete http status code
        res.sendStatus(204); // No Content
    }
);

//put method to update a manual by its id
router.put('/manual/:id', authenticateToken, validationRules, handleValidationErrors, (req, res) => {
    const { admin } = req.user;

    if (admin !== true) {
        return res.sendStatus(401); // Unauthorized
    }

    Manual.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        link: req.body.link,
        model: req.body.model,
        manufacturer: req.body.manufacturer,
        type: req.body.type,
        isRestricted: req.body.isRestricted
    })
        .then((user) => {
            console.log('User saved:', user);
        })
        .catch((error) => {
            console.error('Error saving user:', error);
        });
    // send ok http status code
    res.sendStatus(200); // OK
});

export default router;