import { Schema, model } from "mongoose";
import app from "../../../app";
import { Request, Response, Router } from "express";
const userRouter = Router();

const userSchema: Schema = new Schema({
    username: {
      type: String,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'business', 'dealer'],
      default: 'user'
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    refreshToken: {
      type: String
    },
    assessToken: {
      type: String
    }
  
  }, { timestamps: true });
  
  const User = model('User', userSchema);
  
  userRouter.get('/', async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json("Error: " + error);
    }
  });



  export default userRouter
