const userService = require('../services/user.Services')

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



exports.Video_Data_Upload = async(req,res,next)=>{
    try{
        const {Title,urlLink,Description} = req.body

        const successRes = await userService.upload_video_data(Title,urlLink,Description)

        res.json({status: true, success:'Data Uploaded Successfully'})
    }catch(err){
        throw err
    }
}

exports.getLink = async (req, res, next) => {
    try {

       const {Title}  = req.body
        const videoLink = await userService.getVideoLink(Title); // Implemented method in userService

        res.status(200).json({ status: true, videoLink: videoLink });
    } catch (err) {
        throw err;
    }
};

//This is my Usercontroller.js file


