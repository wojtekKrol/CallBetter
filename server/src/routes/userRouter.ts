import bcrypt from 'bcrypt';
import { CustomRequestWithQuery } from 'customRequestResponse';
import express, { Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { UserAuth, UserLoginQuery } from 'user';

import User from '../models/user';

const router: Router = express.Router();

// eslint-disable-next-line consistent-return
router.post(
  '/sign-up',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: CustomRequestWithQuery<UserAuth>, res: Response) => {
    try {
      const { email, password, passwordCheck } = req.body;

      //  validate
      if (!email || !password || !passwordCheck) {
        return res
          .status(400)
          .json({ msg: 'Not all fields have been entered.' });
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

      const existUser = await User.findOne({ email });

      if (existUser) {
        return res
          .status(400)
          .json({ msg: 'An account with this email already exists.' });
      }

      const salt = await bcrypt.genSalt();
      const passHash = await bcrypt.hash(password, salt);

      const newUser = new User({
        email,
        password: passHash,
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const savedUser = await newUser.save();
      return res.json(savedUser);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },
);

router.post(
  '/login',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (
    req: CustomRequestWithQuery<UserLoginQuery>,
    res: Response,
    // eslint-disable-next-line consistent-return
  ) => {
    try {
      const { email, password } = req.body;

      //validate
      if (!email || !password) {
        return res.status(400).json({ msg: 'Enter email and password' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          error: `There is no user with this email has been registered`,
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, <string>process.env.JWT_SECRET);
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
);

export default router;
