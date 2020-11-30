/* eslint-disable @typescript-eslint/no-misused-promises,consistent-return */
/* eslint-disable-next-line consistent-return */

import express, { Router } from 'express';

import auth from '../middlewares/auth';
import Call from '../models/call';
import User from '../models/user';

const router: Router = express.Router();

router.get('/getCallData', auth, async (req: any, res: any) => {
  if (req.clientCallId) {
    const call = await Call.findById(req.clientCallId);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    res.json(call);
  }
  res.json({ clientCallId: 'noCallId' });
});

router.post(`/createCall`, auth, async (req: any, res: any) => {
  try {
    const { hostId, status } = req.body;
    if (!hostId) {
      return res.status(400).json({ msg: 'There is no provided hostId.' });
    }
    if (!status) {
      return res.status(400).json({ msg: 'There is no provided status.' });
    }

    const newCall = new Call({ hostId, status });
    const savedCall = await newCall.save();

    res.json(savedCall);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/endCall', auth, async (req: any, res: any) => {
  try {
    const { id, endDate, status } = req.body;

    const updatedCall = await Call.findByIdAndUpdate(
      id,
      { endDate, status },
      { new: true },
    );
    res.json(updatedCall);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// router.post('/updateCall', auth, async (req: any, res: any) => {
//   try {
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// });

export default router;
