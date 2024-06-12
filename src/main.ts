import express, { Request, Response } from 'express';
import mongoose, { Schema, model, Document } from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://emaJohn:wPqXoAcgB0YOVNTv@cluster0.np7fjqr.mongodb.net/solution?retryWrites=true&w=majority';

// Middleware to parse JSON
app.use(express.json());

// Define the User schema
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

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
