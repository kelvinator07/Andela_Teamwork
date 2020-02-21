import cloudinary from 'cloudinary';
require('dotenv').config();

// Setting env variable CLOUDINARY_URL
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default cloudinary;
