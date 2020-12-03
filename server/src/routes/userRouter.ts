/* eslint-disable @typescript-eslint/no-misused-promises,consistent-return */
/* eslint-disable-next-line consistent-return */
import bcrypt from 'bcrypt';
import express, { Response, Router, Request } from 'express';
import jwt from 'jsonwebtoken';

import auth from '../middlewares/auth';
import User from '../models/user';
import { CustomRequestWithQuery } from '../types/customRequestResponse';
import { UserAuth, UserLoginQuery } from '../types/user';

const router: Router = express.Router();

router.post(
  '/sign-up',
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
      res.status(500).json({ error: err.message });
    }
  },
);

router.post(
  '/login',
  async (req: CustomRequestWithQuery<UserLoginQuery>, res: Response) => {
    try {
      const { email, password } = req.body;

      //validate
      if (!email || !password) {
        return res
          .status(400)
          .json({ msg: 'Not all fields have been entered.' });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          msg: `There is no user with this email has been registered.`,
        });
      }

      const isMatch = await bcrypt.compare(password, user?.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials.' });
      }

      const token = jwt.sign({ id: user.id }, <string>process.env.JWT_SECRET);
      return res.json({
        token,
        userData: {
          id: user.id,
        },
        logged: true,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

router.delete('/delete', auth, async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/tokenIsValid', async (req: Request, res: Response) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.json(false);
    }

    const { JWT_SECRET } = process.env;
    // @ts-ignore
    const verified = jwt.verify(token, JWT_SECRET);

    if (!verified) {
      return res.json(false);
    }
    // @ts-ignore
    const user = await User.findById(verified.id);

    if (!user) {
      return res.json(false);
    }

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', auth, async (req: any, res: any) => {
  const user = await User.findById(req.user);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  res.json(user);
});

router.get('/getUserData', auth, async (req: any, res: any) => {
  const user = await User.findById(req.query.id);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  res.json(user);
});

router.post('/createProfile', auth, async (req: any, res: any) => {
  try {
    const { name, gender, birthday, about } = req.body;

    if (!name || !gender || !birthday || !about) {
      return res.status(400).json({ msg: 'Not all fields have been entered.' });
    }
    if (about.length > 256) {
      return res
        .status(400)
        .json({ msg: 'About must be shorter than 256 chars' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      // @ts-ignore
      req.user,
      {
        name,
        gender,
        birthday,
        about,
      },
      { new: true },
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
