import express, { Application, Request, Response } from 'express';
import { Schema, model } from 'mongoose';
import useMiddleware from './middleware';
const app: Application = express();

useMiddleware(app);


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
  
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
  });
  
  app.get('/user', async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json("Error: " + error);
    }
  });

export default app;
