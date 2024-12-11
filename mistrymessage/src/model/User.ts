import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string,
  email: string,
  password: string,
  verifyCode: string,
  verifyCodeExpiry: Date,
  isVerified:Boolean,
  isAcceptingMessage: boolean,
  message: Message[]
}

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is requried"],
    unique: true,
    trim:true,
  },
  email: {
    type: String,
    required: [true, "Email is requried"],
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"please use a valid field"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "verifycode is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "verify code Expiry is required"]
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true
  },
  message: [messageSchema]
});


const UserModel = (mongoose.models.User as mongoose.Model<User>)|| mongoose.model<User>("User", userSchema);

export default UserModel;