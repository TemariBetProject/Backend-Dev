const router = require('express').Router()
const userController =  require('../Controller/Userconroller')

router.post('/registration', userController.register)

router.post('/login', userController.login)

router.post('/upload_content', userController.Video_Data_Upload)

router.get('/getvideo',userController.getLink)

module.exports = router

//This is my user.route.js file