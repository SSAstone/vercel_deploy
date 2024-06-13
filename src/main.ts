import express, { Request, Response } from 'express';
import mongoose, { Schema, model, Document } from 'mongoose';
import dotenv from 'dotenv'
import app from './app';
const PORT = process.env.PORT || 3000;
dotenv.config()

const URI = process.env.MONGODB_URI as string;
console.log("🚀 ~ URI:", URI)

mongoose.connect(URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
