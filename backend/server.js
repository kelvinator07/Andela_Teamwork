import app from './app';


const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Teamwork listening on port ${port}!`);
});
