import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const playListSchema = new Schema(
  {
    name: String,

    songs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'song',
      },
    ],

    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
    isFavorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.model('playList', playListSchema);
