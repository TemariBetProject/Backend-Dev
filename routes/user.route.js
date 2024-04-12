const router = require('express').Router()
const userController =  require('../Controller/Userconroller')

router.post('/registration', userController.register)

router.post('/login', userController.login)

module.exports = router