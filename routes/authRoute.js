const express = require('express')
const UserController = require('../controllers/userController')

const router = express.Router()

const userController =  new UserController() 

router.post('/register', userController.createUser)
router.delete('/delete', userController.deleteUser)



module.exports = router