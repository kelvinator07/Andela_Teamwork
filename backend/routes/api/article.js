import express from 'express';
import auth from '../../middlewares/auth';

const router = express.Router();


const articleCtrl = require('../../controllers/article');

router.post('/articles', auth, articleCtrl.createArticle);
router.put('/articles/:id', auth, articleCtrl.editArticle);


export default router;
