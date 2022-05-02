import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const userInfo = new Schema(
  {
    firstName: String,
    lastName: String,
    displayName: String,
    avatarUrl: String,
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
  },
  { _id: false, id: false }
);

const userSchema = new Schema(
  {
    email: { type: String },
    username: { type: String },
    password: { type: String },
    phone: { type: String },
    desc: String,
    info: userInfo,
    token: String,
    refreshToken: String,
    refreshTokenExpires: Date,
    isValidEmail: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('user', userSchema);
