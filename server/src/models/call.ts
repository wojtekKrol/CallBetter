import mongoose, { Schema } from 'mongoose';

const callSchema = new Schema(
  {
    hostId: {
      type: String,
      required: true,
    },
    guestId: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

callSchema.set('toJSON', { getters: true, virtuals: true });
export default mongoose.model('Call', callSchema);
