import express from 'express';
import cloudinary from 'cloudinary';

const router = express.Router();

cloudinary.config({
  cloud_name: 'ddjabt4dc',  // Hardcoded for now
  api_key: '677114537463772',
  api_secret: '8lCKfPKdmaLpA3XDu_HYNIJ3nYw',
});

router.get('', async (req, res) => {
  try {
    const response = await cloudinary.v2.api.resources({
      type: 'upload',
      max_results: 1,
      order_by: 'created_at',
      direction: 'desc',
    });

    const latestImage = response.resources[0];
    const latestImageUrl = latestImage ? latestImage.secure_url : null;

    res.json({ imageUrl: latestImageUrl });
  } catch (error) {
    console.error('Error fetching the latest image:', error);
    res.status(500).json({ message: 'Error fetching the latest image' });
  }
});

export default router;
