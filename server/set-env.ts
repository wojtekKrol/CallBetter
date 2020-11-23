import dotenv from 'dotenv';
import { writeFile } from 'fs';

const targetPath = './build/.env';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const envConfig = `MONGO_PASSWORD: '${process.env.MONGO_PASSWORD}'`;

writeFile(targetPath, envConfig, (err: any) => {
  if (err) {
    throw console.error(err);
  } else {
    // eslint-disable-next-line no-console
    console.log(`Done ${targetPath} \n`);
  }
});
