const Model = require('../model/user.model')
const jwt = require('jsonwebtoken')

class userService{
    static async registerUser(firstName,lastName,schoolName,phoneNumber,email, password){
        try{
          const createUser = new Model.userModel({firstName,lastName,schoolName,phoneNumber,email, password})
          return await createUser.save()
        }catch(err){
            throw err
        }
    }
    

   // upload video data function
    static async upload_video_data(gradeLevel,Title,urlLink,Description,Course,image){
        try{
          const createVideo = new Model.VideoModel({gradeLevel,Title,urlLink,Description,Course,image})
          return await createVideo.save()
        }catch(err){
            throw err
        }

    }

   
    static async getVideoDataByTitle(title) {
        try {
            return await Model.VideoModel.findOne({ Title: title });
        } catch (err) {
            throw err;
        }
    }

    // In services/user.Services.js
static async getVideoDataByCourse(course) {
    try {
        return await Model.VideoModel.find({ Course: course }); // Note: Make sure the key is exactly as used in your schema
    } catch (err) {
        throw err;
    }
}

    

    static async checkUser(email){
        try {
            return await Model.userModel.findOne({email})
        } catch (error) {
            throw error
        }
    }

    static async generateToken(tokenData,secretKey, jwt_expire){
    return jwt.sign(tokenData,secretKey,{expiresIn:jwt_expire})
    


}
  
}





module.exports = userService

//This is my user.Services.js file