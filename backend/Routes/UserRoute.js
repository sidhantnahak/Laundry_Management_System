const express = require('express');
const router = express.Router();
const User = require('../Models/Usermodel')
const {userLogin, registerUser, GetUser, Logout, updateProfile, updatePassword, forgetPassword, resetPassword, checkOTP}=require('../Controllers/UserController');
const { isAuthenticated } = require('../middleware/Auth');



router.route('/login').post(userLogin)
router.route('/register').post(registerUser)
router.route('/password/forgot').post(forgetPassword)
router.route('/password/reset/otp').put(checkOTP)
router.route('/password/reset').put(isAuthenticated, resetPassword)




router.route('/me').post(isAuthenticated,GetUser)
router.route('/logout').get(isAuthenticated,Logout)
router.route('/me/update').put(isAuthenticated,updateProfile)
router.route('/password/update').put(isAuthenticated,updatePassword)


module.exports = router;
