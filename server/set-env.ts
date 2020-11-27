import dotenv from 'dotenv';
import { writeFile, mkdirSync, existsSync } from 'fs';
import path from 'path';

dotenv.config();

const targetPath = './build/.env';
const dirName = './build';

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirName);
  mkdirSync(dirName);
}

ensureDirectoryExistence(dirName);

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const envConfig = `MONGO_URI=${process.env.MONGO_URI}`;

writeFile(targetPath, envConfig, (err: any) => {
  if (err) {
    throw console.error(err);
  } else {
    // eslint-disable-next-line no-console
    console.log(`Done ${targetPath} \n`);
  }
});
