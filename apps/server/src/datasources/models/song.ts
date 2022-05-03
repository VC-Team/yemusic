import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const playListSchema = new Schema(
  {
    yId: String,
    thumbnail: {
      url: String,
      width: Number,
      height: Number,
    },
    duration: String,
    title: String,
    channel: String,
    view: String,
    publishedAt: String,
  },
  { timestamps: true }
);

export const User = mongoose.model('playList', playListSchema);
