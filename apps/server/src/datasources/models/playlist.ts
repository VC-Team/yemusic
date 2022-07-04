import * as mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const playListSchema = new Schema(
  {
    name: String,
    description: String,

    owner: {
      type: ObjectId,
      ref: 'user',
    },
    songs: [
      {
        type: ObjectId,
        ref: 'song',
      },
    ],

    isLikedTrack: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const PlayList = mongoose.model('playlist', playListSchema);
