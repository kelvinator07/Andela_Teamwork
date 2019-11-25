import app from './app';


const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = app.address();
  const bind = typeof address === 'string' ? `pipe${address}` : `port: ${port}`;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

app.on('error', errorHandler);
app.on('listening', () => {
  const address = app.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${port}`;
  console.log(`Teamwork Listening on ${bind}`);
});

const server = app.listen(port, () => {
  console.log(`Teamwork listening on port ${port}!`);
});


exports.closeServer = () => {
  server.close();
};

module.exports = server;
