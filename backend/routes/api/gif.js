import express from 'express';
import auth from '../../middlewares/auth';

const router = express.Router();

const gifCtrl = require('../../controllers/gif');

router.post('/gifs', auth, gifCtrl.createGif);

router.delete('/gifs/:id', auth, gifCtrl.deleteGif);


export default router;
