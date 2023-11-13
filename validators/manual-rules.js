import { body, validationResult } from 'express-validator';

const validationRules = [
    body('name').isString().notEmpty().withMessage('Nome é obrigatório'),
    body('model').isString().notEmpty().withMessage('Modelo é obrigatório'),
    body('manufacturer').isString().notEmpty().withMessage('Fabricante é obrigatório'),
    body('type').isString().notEmpty().withMessage('Tipo é obrigatório'),
    body('link').isString().notEmpty().withMessage('Link é obrigatório'),
    body('link').contains('http').withMessage('Link deve iniciar com http/https'),
    body('isRestricted').isBoolean(),
];

export default validationRules;