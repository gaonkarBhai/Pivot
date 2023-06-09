import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

// ---------------- Register -------------------

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, question } = req.body;

    //validation
    if (!name) return res.send({ message: "Name is required" });
    if (!email) return res.send({ message: "Email is required" });
    if (!password) return res.send({ message: "Password is required" });
    if (!phone) return res.send({ message: "Phone is required" });
    if (!address) return res.send({ message: "Address is required" });
    if (!question) return res.send({ message: "Answer is required" });

    // check the existance of user
    const existsUser = await userModel.findOne({ email });
    if (existsUser)
      return res.status(200).send({
        success: false,
        message: "User is already exists please login",
      });

    // hash User password
    const hashedpassword = await hashPassword(password);

    // Save the user
    const user = await new userModel({
      name,
      password: hashedpassword,
      email,
      address,
      phone,
      question,
    }).save();
    res
      .status(201)
      .send({ success: true, message: "Registered successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// ------------------ Login -------------------------

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(404)
        .send({ success: false, message: "Invalid email or password" });
    // existance of user
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "Email is not registered" });
    // comparing the password
    const match = await comparePassword(password, user.password);
    if (!match)
      return res
        .status(200)
        .send({ success: false, message: "Invalid password" });

    // creating JWT Token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id:user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role:user.role
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};


// ------------------- forgot password ---------------
export const forgotPasswordController = async(req,res)=>{
  try {
    const { question, email, newPassword } = req.body;
    if (!email) return res.status(404).send({ message: "Email is required" });
    if (!question) return res.status(404).send({ message: "Answer is required" });
    if (!newPassword) return res.status(404).send({ message: "New Password is required" });

    const user = await userModel.findOne({email,question})

    // check user
    if(!user) return res.status(404).send({success:false, message: "User is not found" });

    const hashed = await hashPassword(newPassword)
    await userModel.findByIdAndUpdate(user._id,{password:hashed})
    res.status(200).send({
      success:true,
      message:"Password reset successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Something went wrong",
      error
    })
  }
}



// ---------------------- test -----------------------

export const testUser = (req,res) =>{
  res.send("Protected");
}