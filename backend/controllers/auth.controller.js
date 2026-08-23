import User from "../models/user.model.js";
import bcrypt from "bcrypt";

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