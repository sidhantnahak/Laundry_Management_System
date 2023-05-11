const User = require('../Models/Usermodel');
const { body, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const sendToken = require('../Utils/jwtTokenHandler');
const sendEmail = require('../Utils/sendEmail')

//Register user
exports.registerUser = async (req, res) => {
  try {
    const { email, name, phone, password } = req.body;
    if (!email || !name || !phone || !password) {
      return res.status(401).json({ message: "enter valid details", sucess: false })
    } 
    
let user = await User.findOne({ email: email });
    if (user) {
      return res.status(404).json({ message: "user already exist", sucess: false })
    }

    user = await User.create({
      name,
      email,
      phone,
      password

    })

    sendToken(user, 201, res);

  } catch (error) {

    return res.status(500).json({ message: error.message, sucess: false })

  }
}

//Login user
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "enter valid email and password", sucess: false })
  }
  try {

    let user = await User.findOne({ email }).select("+password")
    if (!user) {
      return res.status(400).json({ message: "user not found", sucess: false })
    }
    let compare_password=await bcryptjs.compare(password,user.password)
    // let compare_password=await user.comparePassword(password)
    if (!compare_password) {
      return res.status(400).json({ message: "enter valid password", sucess: false })

    }
    sendToken(user, 201, res);

  } catch (error) {
    return res.status(500).json({ message: error.message, sucess: false })
  }
}

//Logout user

exports.Logout = async (req, res) => {

  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true
  })

  res.status(200).json({ sucess: true, message: "Logged out sucessfully" })

}


//Get User
exports.GetUser = async (req, res) => {

  const userId = req.id;

  try {
    const user = await User.findById(userId).select("-password");
    return res.status(200).json({ user, sucess: true });
  } catch (error) {
    return res.status(401).json({ message: error.message, sucess: false })
  }

}


//update profile

exports.updateProfile = async (req, res) => {

  try {

    const newprofileData = {
      name: req.body.name,
      phone: req.body.phone
    }


    const user = await User.findByIdAndUpdate(req.id, newprofileData, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    })

    if (!user) {
      return res.status(400).json({ message: "user not found", sucess: false })

    }
    res.status(200).json({
      sucess: true,
      message: "profile updated"
    })

  } catch (error) {
    return res.status(401).json({ message: error.message, sucess: false })

  }
}



//update password

exports.updatePassword = async (req, res, next) => {

  try {
    const user = await User.findById(req.id).select("+password")

    const ispasswordMatched = await user.comparePassword(req.body.oldPassword)

    if (!ispasswordMatched) {
      return res.status(400).json({ message: "old password incorrect", sucess: false })

    }
    if (req.body.newPassword != req.body.confirmPassword) {
      return res.status(202).json({message:"new password and confirm password are not same password is incorrect", sucess:false})

    }
    user.password = req.body.newPassword
    await user.save({validateBeforeSave:false})
    sendToken(user, 201, res)
  } catch (error) {
    return res.status(401).json({ message: error.message, sucess: false })

  }
}


//Forget password

exports.forgetPassword = async (req, res) => {

  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(400).json({ message: "user not found", sucess: false })

  }
  try {

    //get reset password token
    const resetToken = user.getResetToken()

    await user.save({validateBeforeSave:false});


    const message = `your One time password (OTP) is :-\n\n ${resetToken} \n\n if you have not requested this email then,please ignore it`;

    await sendEmail({
      email: user.email,
      subject: `Ecommerece password recovery`,
      message: message
    })
    res.status(200).json({
      sucess: true,
      message: `Email sent to ${user.email} successfully`
    })

  } catch (error) {
    user.resetPasswordExpire = undefined
    user.resetPasswordToken = undefined;
    await user.save({ validateBeforeSave: false });
    return res.status(400).json({ message: error.message, sucess: false })


  }

}


// Reset password

exports.checkOTP = async (req, res) => {
  try {

    let myotp = req.body.otp;

    const user = await User.findOne({
      resetPasswordToken: myotp,
      resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) {
      return res.status(404).json({ message: "Reset token is invalid or has been expired", sucess: false })

    }
    await user.save({validateBeforeSave:false})
    sendToken(user, 200, res)

  } catch (error) {
    return res.status(404).json({ message: error.message, sucess: false })

  }
}
exports.resetPassword = async (req, res) => {

  try {

    const user = await User.findById(req.id).select("-password");
    if (!user) {
      return res.status(400).json({ message: "user not found", sucess: false })

    }
    if (req.body.password != req.body.confirmPassword) {
      return res.status(400).json({ message: "password and confirm password does not matching", sucess: false })

    }

    user.password = req.body.confirmPassword
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save({validateBeforeSave:false})
    // sendToken(user, 201, res)
    return res.status(200).json({message:"password updated sucessfully",sucess:true})

  } catch (error) {

    return res.status(401).json({ message: error.message, sucess: false })
  }

}




