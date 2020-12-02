import mongoose, { Schema } from 'mongoose';
import mongooseHidden from 'mongoose-hidden';

import { UserProps } from '../types/user';

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      hide: true,
    },
    passwordCheck: {
      type: String,
      hide: true,
    },
    name: {
      type: String,
    },
    gender: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    about: {
      type: String,
      maxlength: 256,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.set('toJSON', { getters: true, virtuals: true });
userSchema.plugin(mongooseHidden());
export default mongoose.model<any>('User', userSchema);
