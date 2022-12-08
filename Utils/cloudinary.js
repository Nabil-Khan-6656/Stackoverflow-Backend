require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dpvicaxva',
    api_key:'965418534871698',
    api_secret:'4KGHoEjnym_ddtMBaWdUgnuKrjo'
});

module.exports = { cloudinary };