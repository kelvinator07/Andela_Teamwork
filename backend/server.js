import http from 'http';
import cloudinary from 'cloudinary';
import app from './app';


const server = http.createServer(app);

cloudinary.config({
  cloud_name: 'kelvinator',
  api_key: '598598888424893',
  api_secret: '_QvFaZal3h-Zy-8Vn6ikUUO2kIo',
});

app.post("/upload", (req, res) => {

  const file = req.files.photo;

  cloudinary.v2.uploader.upload(file.tempFilePath, (err, result) => {
    res.send({
      success: true,
      result,
    });
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Teamwork listening on port ${port}!`);
});
