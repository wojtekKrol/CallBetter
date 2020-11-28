import mongoose, { Schema } from 'mongoose';

const callSchema = new Schema(
  {
    hostId: {
      type: String,
    },
    guestId: {
      type: String,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

callSchema.set('toJSON', { getters: true, virtuals: true });
export default mongoose.model('Call', callSchema);
