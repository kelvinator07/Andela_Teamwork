import express from 'express';
import auth from '../../middlewares/auth';

const router = express.Router();


const articleCtrl = require('../../controllers/article');

router.post('/articles', auth, articleCtrl.createArticle);
router.put('/articles/:id', auth, articleCtrl.editArticle);
router.delete('/articles/:id', auth, articleCtrl.deleteArticle);
router.post('/articles/:id/comment', auth, articleCtrl.commentArticle);


export default router;
