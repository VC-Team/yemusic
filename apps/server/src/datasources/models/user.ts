import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const userInfo = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    displayName: String,
    avatarUrl: String,
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
  },
  { _id: false, id: false }
);

export const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    desc: String,
    info: userInfo,
    isValidEmail: Boolean,
    isBlocked: Boolean,
  },
  { timestamps: true }
);

const User = mongoose.model('user', userSchema);

module.exports = User;
