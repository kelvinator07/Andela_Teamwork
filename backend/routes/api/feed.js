import express from 'express';
import feedCtrl from '../../controllers/feed';
import auth from '../../middlewares/auth';

const router = express.Router();


router.get('/feed', auth, feedCtrl.getAllFeed);


export default router;
