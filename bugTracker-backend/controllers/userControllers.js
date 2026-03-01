import Bug from "../Modals/bugsSchema.js"
import User from "../Modals/userschema.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";


export const getusers=async(req,res)=>{
 const allusers = await User.find();
  res.json(allusers);
}
export const registerusers=async(req,res)=>{
 try {
    const { name, email, password } = req.body;
    const isemail = await User.findOne({ email });

    if (isemail) {
      return res.status(401).json("User already exist");
    }

    const saltRounds = 10;
    const hashedpass = await bcrypt.hash(password, saltRounds);
    

    const user = await User.create({
      name,
      email,
      password: hashedpass,
      role: "user",
    });
    return res.status(201).json({
      message: "register successfull",
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong" });
  }
}

export const loginusers =async(req,res)=>{
  try {
    const { email, password } = req.body;
    const allusers = await User.findOne({ email });
    if (!allusers) {
      return res.status(404).json("Oops, user already exist");
    }
    const hash = await bcrypt.compare(password, allusers.password);

    if (!hash) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }
    const payload = {
      id: allusers._id,
      email: allusers.email,
      role: allusers.role,
      name:allusers.name,
    };
   
    const token = jwt.sign(payload, process.env.secretey);
    res.cookie("item", token,{
      httpOnly: true,
      secure:true,
      sameSite:"none" 
    });

    return res.status(200).json({
      message: "Successfully logged in",
    });
  } catch (error) {
    console.error(error);
  }
} 


export const logoutusers=async(req,res)=>{
  const data = res.clearCookie("item");
  res.json({ message: "success" });
}

export const protectedroute=async(req,res)=>{
  try {
    return res.status(201).json(req.user);
  } catch (error) {
    return res.status(404).json({ message: "no permission" });
  }
}