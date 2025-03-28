import {User} from "../models/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

//Register User
const registerUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const existingUser = await User.findOne({email})
        if(existingUser){
            if(existingUser.email === email){
                return res.status(400).json({
                    message:"email already exists"
            })
        }}else{
            const hashedPassword = await bcrypt.hash(password,10)
            const newUser = new User(
                {
                 email,
                 password:hashedPassword
                })
            await newUser.save()

            res.status(201).json({
                message:"User created successfully",
                user:{email}
            })

        }

    }
    catch(e){
        console.log(e)
        res.status(500).json({
            message:"Register failed,Try again"
        })
    }
}


//Login User

const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            res.status(404).json({
                message:"email not found"
            })
            const pass = await bcrypt.compare(password,user.password);
            if(!pass){
                res.status(404).json({
                    message:"password wrong"
                })
            }
        }
        else{
            const token = jwt.sign({id:user._id,email:user.email},process.env.SECRET_KEY)
            res.status(200).json({
                message:"login Successfull",
                user:{email},
                token:token
            })
        }
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            message:"Login failed Try again"
        })
    }
}

export {registerUser,loginUser}