import express, { Request, Response, Router } from 'express';

import User from './models/user';
import { UserType } from './types/user';
const router: Router = express.Router();

router.get('/sign-up', (req: Request, res: Response) => {
  res.send('Hello its working');
});

router.post('/sign-up', async (req: Request, res: Response) => {
  try {
    const { email, password, passwordCheck } = req.body as UserType;

    //  validate
    if (!email || !password || !passwordCheck) {
      return res.status(400).json({ msg: 'Not all fields have been entered.' });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: 'The password needs to be at least 6 character long.' });
    }
    if (passwordCheck !== password) {
      return res
        .status(400)
        .json({ msg: 'Enter the same password twice for verification.' });
    }

    const existUser = await User.find({ email });

    if (existUser) {
      return res
        .status(400)
        .json({ msg: 'An account with this email already exists.' });
    }

    return res.status(200).json({ msg: 'Account created.' });
  } catch (e) {
    console.error(e);
  }
});

export default router;
