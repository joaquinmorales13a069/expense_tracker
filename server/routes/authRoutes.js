import express from 'express';
import { registerUser, loginUser, getUserInfo } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';



const router = express.Router();

// Route for user registration
router.post('/register', registerUser);
// Route for user login
router.post('/login', loginUser);
// Route to get user information
router.get('/user', protect, getUserInfo);

router.post('/upload-image', upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
        
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
})

export { router as authRoutes };