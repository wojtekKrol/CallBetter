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
      const callId = req.callId;
      if (callId === 'noCallId') {
        const newCall = new Call({ hostId: userId });
        const savedCall = await newCall.save();
        return res.json(savedCall);
      }
      const updatedPerson = { questId: userId };
      const call = await Call.findByIdAndUpdate(callId, updatedPerson, {
        new: true,
      });
      return res.json(call);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
);

router.get('/:id', auth, async (req: any, res: any) => {
  if (req.callId) {
    const call = await Call.findById(req.callId);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    res.json(call);
  }
  res.json({ callId: 'noCallId' });
});

export default router;
