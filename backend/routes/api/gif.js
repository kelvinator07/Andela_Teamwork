import express from 'express';
import auth from '../../middlewares/auth';

const router = express.Router();

const gifCtrl = require('../../controllers/gif');

router.post('/gifs', auth, gifCtrl.createGif);
router.delete('/gifs/:id', auth, gifCtrl.deleteGif);
router.post('/gifs/:id/comment', auth, gifCtrl.commentGif);


export default router;
