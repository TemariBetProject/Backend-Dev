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
    static async upload_video_data(Title,urlLink,Description){
        try{
          const createUser = new Model.VideoModel({Title,urlLink,Description})
          return await createUser.save()
        }catch(err){
            throw err
        }

    }

   
    static async getVideoLink(title) {
        try {
            // Fetch the video link from the database based on the provided title
            const video = await Model.VideoModel.findOne({ Title: title }); 
            if (!video) {
                throw new Error('Video not found');
            }
            return video.urlLink;
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