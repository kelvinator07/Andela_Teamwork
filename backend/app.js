import express from 'express';
import bodyParser from 'body-parser';

import articleRoutes from './routes/api/article';
import gifRoutes from './routes/api/gif';
import userRoutes from './routes/api/user';

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use('/api/v1', articleRoutes);
app.use('/api/v1', gifRoutes);
app.use('/api/v1/auth', userRoutes);


export default app;
