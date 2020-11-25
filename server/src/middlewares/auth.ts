import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';

// eslint-disable-next-line consistent-return,@typescript-eslint/explicit-module-boundary-types
const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('x-auth-token');

    if (!token) {
      return res
        .status(401)
        .json({ msg: 'No authentication token, access denied' });
    }
    const { JWT_SECRET } = process.env;

    // @ts-ignore
    const verified = jwt.verify(token, JWT_SECRET);
    if (!verified) {
      return res
        .status(401)
        .json({ msg: 'No authentication token, access denied' });
    }

    // @ts-ignore
    req.user = verified.id;
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default auth;
