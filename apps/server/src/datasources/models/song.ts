import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const songSchema = new Schema(
  {
    yId: String,
    thumbnail: {
      url: { type: String },
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

export const Song = mongoose.model('song', songSchema);
