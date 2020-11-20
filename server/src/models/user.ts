import mongoose, { Schema } from 'mongoose';
import mongooseHidden from 'mongoose-hidden';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    about: {
      type: String,
      maxlength: 256,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      hide: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.set('toJSON', { getters: true, virtuals: true });
userSchema.plugin(mongooseHidden());
export default mongoose.model('User', userSchema);
