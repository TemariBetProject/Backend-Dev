const userModel = require('../model/user.model')
const jwt = require('jsonwebtoken')

class userService{
    static async registerUser(firstName,lastName,schoolName,phoneNumber,email, password){
        try{
          const createUser = new userModel({firstName,lastName,schoolName,phoneNumber,email, password})
          return await createUser.save()
        }catch(err){
            throw err
        }

    }

    static async checkUser(email){
        try {
            return await userModel.findOne({email})
        } catch (error) {
            throw error
        }
    }

    static async generateToken(tokenData,secretKey, jwt_expire){
    return jwt.sign(tokenData,secretKey,{expiresIn:jwt_expire})
    


}
  
}



module.exports = userService