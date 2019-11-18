import express from 'express';

const router = express.Router();

const userCtrl = require('../../controllers/user');


router.post('/create-user', userCtrl.signup);

router.post('/signin', userCtrl.signin);


export default router;
