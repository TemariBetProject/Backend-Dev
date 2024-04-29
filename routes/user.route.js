const router = require('express').Router()
const userController =  require('../Controller/Userconroller')
const multer = require('multer');
// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Destination folder
    },
    filename: function (req, file, cb) {
      // Use original file name with timestamp to avoid naming conflicts
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  // Create multer upload instance with the defined storage
const upload = multer({ storage: storage });

router.post('/upload_content', upload.single('image'), userController.Video_Data_Upload);
router.post('/registration', userController.register)
router.post('/login', userController.login)
router.get('/get_video_data_by_title', userController.getVideoDataByTitle);
router.get('/get_video_data_by_course', userController.getVideoDataByCourse);

// Route to increment video views
router.patch('/video/:id/incrementViews', userController.incrementVideoViews);

// Route to get top viewed videos
router.get('/videos/topViews', userController.getTopVideos);

router.get('/search', userController.searchLessons);



module.exports = router

//This is my user.route.js file