import express from 'express';
import auth from '../../middlewares/auth';
import gifCtrl from '../../controllers/gif';

const router = express.Router();

router.post('/gifs', auth, gifCtrl.createGif);

router.get('/gifs/:id', auth, gifCtrl.getGif);

router.delete('/gifs/:id', auth, gifCtrl.deleteGif);

router.post('/gifs/:id/comment', auth, gifCtrl.commentGif);


export default router;
