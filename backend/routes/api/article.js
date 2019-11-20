import express from 'express';
import auth from '../../middlewares/auth';
import articleCtrl from '../../controllers/article';

const router = express.Router();


router.get('/articles', auth, articleCtrl.getAllArticles);

router.post('/articles', auth, articleCtrl.createArticle);

router.get('/articles/:id', auth, articleCtrl.getArticle);

router.put('/articles/:id', auth, articleCtrl.editArticle);

router.delete('/articles/:id', auth, articleCtrl.deleteArticle);

router.post('/articles/:id/comment', auth, articleCtrl.commentArticle);


export default router;
