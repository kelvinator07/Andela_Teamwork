import express from 'express';
import bodyParser from 'body-parser';

import userRoutes from './routes/api/user';

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use('/api/v1/auth', userRoutes);

export default app;
