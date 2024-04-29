const userService = require('../services/user.Services')
// In Controller/UserController.js
const { VideoModel } = require('../model/user.model');  // Make sure the path is correct and VideoModel is included


exports.register = async(req,res,next)=>{
    try{
        const {firstName,lastName,schoolName,phoneNumber,email, password} = req.body

        const successRes = await userService.registerUser(firstName,lastName,schoolName,phoneNumber,email, password)

        res.json({status: true, success:'User Registered Successfully'})
    }catch(err){
        throw err
    }
}

exports.login = async(req,res,next)=>{
    try{
        const {email, password} = req.body

        const user = await userService.checkUser(email)


        if(!user){
            throw new Error("User Doesnt exist")
        }

        const isMatch =await user.comparePassword(password)
        if(isMatch === false){
            throw new Error ('Password Invalid')
        }

        let tokenData = {_id: user._id, email: user.email}

        const token = await userService.generateToken(tokenData,'temari1212', '1h' )

        res.status(200).json({status: true, token:token})         
    }catch(err){
        throw err
    }
}

exports.Video_Data_Upload = async (req, res, next) => {
    try {
        const { gradeLevel,Title,urlLink,Description,Course} = req.body;
        const image = req.file.filename; // Assuming you're using multer for file uploads and 'filename' contains the name of the uploaded image
        const successRes = await userService.upload_video_data(gradeLevel,Title,urlLink,Description,Course,image);

        res.json({ status: true, success: 'Data Uploaded Successfully' });
    } catch (err) {
        throw err;
    }
};

exports.getVideoDataByTitle = async (req, res, next) => {
    try {
        const { title } = req.query;
        const videoData = await userService.getVideoDataByTitle(title);

        if (!videoData) {
            return res.status(404).json({ status: false, message: 'Video data not found' });
        }

        res.status(200).json({ status: true, videoData: videoData });
    } catch (err) {
        throw err;
    }
};

// In Controller/UserController.js
// User controller
// In Controller/UserController.js
// In Controller/UserController.js
exports.getVideoDataByCourse = async (req, res) => {
    try {
        const { course, grade } = req.query;
        const numericGrade = parseInt(grade, 10);  // Ensuring grade is an integer
        if (isNaN(numericGrade)) {
            return res.status(400).json({ status: false, message: 'Invalid grade provided' });
        }
        const videoData = await userService.getVideoDataByCourse(course, numericGrade);

        if (!videoData.length) {  // Check if the array is empty
            return res.status(404).json({ status: false, message: 'Video data not found for the specified course and grade' });
        }

        res.json({ status: true, videoData });
    } catch (err) {
        console.error("Error fetching video data:", err);  // More detailed error logging
        res.status(500).json({ status: false, message: err.message });
    }
};

//This is my Usercontroller.js file
// Increment view count
exports.incrementVideoViews = async (req, res) => {
    const { id } = req.params;
    try {
        const video = await VideoModel.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
        if (!video) {
            return res.status(404).json({ status: false, message: 'Video not found' });
        }
        res.status(200).json({ status: true, video });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

// Get top viewed videos
exports.getTopVideos = async (req, res) => {
    try {
        const videos = await VideoModel.find().sort({ views: -1 }).limit(3);
        res.json({ status: true, videoData: videos });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};


