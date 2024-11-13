export const PORT = 8000;

// online database
export const DATABASE = "mongodb+srv://johnasblasco:XJqJKdAYkUHtvMBM@cluster0.bxlnnpb.mongodb.net/Parking?retryWrites=true&w=majority&appName=Cluster0"


// offline database
// export const DATABASE = "mongodb://localhost:27017/Parking";


// cloudinary
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
