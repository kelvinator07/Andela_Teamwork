import cloudinary from 'cloudinary';

// Setting env variable CLOUDINARY_URL
cloudinary.config({
  cloud_name: 'kelvinator',
  api_key: '598598888424893',
  api_secret: '_QvFaZal3h-Zy-8Vn6ikUUO2kIo',
});

export default cloudinary;
