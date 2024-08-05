const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const authRoutes = require('./routes/auth');
const newsRoutes = require('./routes/News');

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Connection error:', err.message);
  });

// Configure sessions
app.use(session({
  secret: 'simple_secret',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'news-uploads',
    allowedFormats: ['jpg', 'png', 'jpeg', 'pdf', 'docx'] 
  },
});

const upload = multer({ storage: storage });

// File upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    res.json({ url: req.file.path }); 
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ message: 'File upload failed' });
  }
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
