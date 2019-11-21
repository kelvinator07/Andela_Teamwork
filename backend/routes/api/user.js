import express from 'express';
import userCtrl from '../../controllers/user';

const router = express.Router();


router.post('/create-user', userCtrl.signup);

router.post('/signin', userCtrl.signin);


export default router;
