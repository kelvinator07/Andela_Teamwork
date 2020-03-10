import express from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import 'babel-polyfill';

import swaggerDocument from '../docs';

import feedRoutes from './routes/api/feed';
import articleRoutes from './routes/api/article';
import gifRoutes from './routes/api/gif';
import userRoutes from './routes/api/user';

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome To Teamwork App!' });
});

app.use('/api/v1', feedRoutes);
app.use('/api/v1', articleRoutes);
app.use('/api/v1', gifRoutes);
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
