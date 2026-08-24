import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import genToken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";


export const signUp = async (req, res) => {
    try {
        const {fullname, email, password, mobile, role} = req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
        }
        if(mobile.length<10){
            return res.status(400).json({message:"Mobile number must be at least 10 digits"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user=await User.create({
            fullname, 
            email, 
            password:hashedPassword, 
            mobile, 
            role
        });

        const token = await genToken(user._id);
        res.cookie("token", token, {
            secure:false,
            sameSite:"strict",
            maxAge: 7*24*60*60*1000, // 7 days
            httpOnly:true
        });
        res.status(201).json({
            message:"User created successfully", 
            user});

    } catch (err) {
        console.error("Error during sign up:", err);
        res.status(500).json(`Error during sign up: ${err.message} `);
    }
}


export const signIn = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Incorrect password"});
        }
            

        const token = await genToken(user._id);
        res.cookie("token", token, {
            secure:false,
            sameSite:"strict",
            maxAge: 7*24*60*60*1000, // 7 days
            httpOnly:true
        });
        res.status(200).json({message:"User signed in successfully", user});

    } catch (err) {
        console.error("Error during sign in:", err);
        res.status(500).json(`Error during sign in: ${err.message} `);
    }
}

export const signOut = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({message:"User signed out successfully"});
    } catch (err) {
        console.error("Error during sign out:", err);
        res.status(500).json(`Error during sign out: ${err.message} `);
    }
}

export const sendOtp = async (req, res) => {
    try {
        const {email} = req.body;  
        const user=await User.findOne({email}); 
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // generate a 6-digit OTP
        user.resetOtp = otp;
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); 
        user.otpExpires = otpExpires;
        user.isOtpVerified = false;
        await user.save();
        console.log(`OTP sent to ${user.email}: ${otp}`);

        await sendOtpMail(user.email, otp, user.fullname);
        return res.status(200).json({message:"OTP sent successfully"});
    } catch (error) {
        console.error("Error during OTP send:", error);
        res.status(500).json(`Error during OTP send: ${error.message} `);   
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const {email, otp} = req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }
        if(!user.otpExpires || user.otpExpires < Date.now()){
            return res.status(400).json({message:"OTP has expired"});
        }
        if(user.resetOtp !== otp){
            return res.status(400).json({message:"Invalid OTP"});
        }
        user.isOtpVerified = true;
        user.resetOtp = undefined;
        user.otpExpires = undefined;
        await user.save();
        return res.status(200).json({message:"OTP verified successfully"});
    } catch (error) {
        console.error("Error during OTP verification:", error);
        res.status(500).json(`Error during OTP verification: ${error.message} `);
    }
}


export const resetPassword = async (req, res) => {
    try {
        const {email, newPassword} = req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }
        if(!user.isOtpVerified){
            return res.status(400).json({message:"OTP is not verified"});
        }
        if (newPassword.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters",
        });
}
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        user.isOtpVerified = false; // Reset OTP verification status after password reset
        await user.save();
        return res.status(200).json({message:"Password reset successfully"});
    } catch (error) {
        console.error("Error during password reset:", error);
        res.status(500).json(`Error during password reset: ${error.message} `);
    }
}