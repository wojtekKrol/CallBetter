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
      // @ts-ignore
      hide: true,
    },
    passwordCheck: {
      type: String,
      // @ts-ignore
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
export default mongoose.model<UserProps>('User', userSchema);
