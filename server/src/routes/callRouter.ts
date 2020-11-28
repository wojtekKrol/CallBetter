/* eslint-disable @typescript-eslint/no-misused-promises,consistent-return */
/* eslint-disable-next-line consistent-return */
//@ts-nocheck
import express, { Response, Router } from 'express';

import auth from '../middlewares/auth';
import Call from '../models/call';
import { CustomRequestWithQuery } from '../types/customRequestResponse';

const router: Router = express.Router();

router.post(
  '/:id',
  auth,
  async (req: CustomRequestWithQuery<any>, res: Response) => {
    try {
      const { userId } = req.body;

      if (req.callId && req.callId !== 'noCallId') {
        const callData = await Call.findById(req.callId);
        const updatedPerson = { questId: userId };
        const call = await Call.findByIdAndUpdate(callData.id, updatedPerson, {
          new: true,
        });
        const newCall = new Call({ call });
        const savedCall = await newCall.save();
        return res.json(savedCall);
      }
      const updatedPerson = { hostId: userId };
      const call = await Call.findByIdAndUpdate(req.callId, updatedPerson, {
        new: true,
      });
      const newCall = new Call({ call });
      const savedCall = await newCall.save();
      return res.json(savedCall);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
);

router.get('/:id', auth, async (req: any, res: any) => {
  const call = await Call.findById(req.callId);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  res.json(call);
});

export default router;
