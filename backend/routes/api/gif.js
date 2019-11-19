import express from 'express';

const router = express.Router();

const gifCtrl = require('../../controllers/gif');

router.post('/gifs', gifCtrl.createGif);


export default router;
