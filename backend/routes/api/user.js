import express from 'express';

const router = express.Router();

const userCtrl = require('../../controllers/user');


router.post('/create-user', userCtrl.signup);


export default router;
