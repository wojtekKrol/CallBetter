import dotenv from 'dotenv';

dotenv.config();

const { MONGO_PASSWORD } = process.env;

export const DATABASE = {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  MONGO_URI: `mongodb+srv://admin:${MONGO_PASSWORD}@callbetter.guzhd.mongodb.net/CallBetter?retryWrites=true&w=majority`,
};
