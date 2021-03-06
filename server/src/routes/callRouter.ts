/* eslint-disable @typescript-eslint/no-misused-promises,consistent-return */
/* eslint-disable-next-line consistent-return */
import express, { Router } from 'express';

import { rooms } from '../index';
import auth from '../middlewares/auth';
import Call from '../models/call';

const router: Router = express.Router();

router.post('/room', auth, (req: any, res: any) => {
  try {
    if (rooms[req.body.roomName] === null) {
      return res.status(400).json({
        roomName: `${req.body.roomName}`,
        msg: 'room_does_not_exist',
      });
    }
    res.status(200).json({
      roomName: `${req.body.roomName}`,
      msg: 'room_exists',
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
//@route create room
router.post('/createRoom', auth, (req: any, res: any) => {
  try {
    rooms[req.body.roomName] = { users: [] };
    res.json({
      roomName: `${req.body.roomName}`,
      msg: 'created',
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
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

router.post('/getCallDetails', auth, async (req: any, res: any) => {
  try {
    const { callId } = req.body;
    const callData = await Call.findById(callId);

    // @ts-ignore
    if (callData.status === 'Closed') {
      return res.status(400).json({ msg: 'Call has been closed.' });
    }

    res.json(callData);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/updateCall', auth, async (req: any, res: any) => {
  try {
    const { callId, userId, hostId, guestId, status } = req.body;

    if (!hostId || !status) {
      return res.status(400).json({ msg: 'hostId or status now provided' });
    }

    if (status === 'Closed') {
      return res.json({ msg: 'Meet has been closed.' }).redirect(400, '/');
    }

    if (hostId) {
      if (hostId === userId) {
        return res
          .status(200)
          .json({ msg: 'You are host and can join to call.' });
      }
    }

    if (guestId) {
      if (guestId === userId) {
        return res
          .status(200)
          .json({ msg: 'You are guest and can join to call.' });
      }
    } else if (!guestId) {
      await Call.findByIdAndUpdate(callId, { guestId: userId }, { new: true });
      return res.status(200).json({ msg: 'Call updated' });
    }

    if (userId !== hostId && userId !== guestId) {
      return res
        .status(400)
        .json({ msg: 'You are not a member of this call.' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/myCalls', auth, async (req: any, res: any) => {
  try {
    const hostRole = await Call.find({
      hostId: req.query.userId,
    })
      .limit(parseInt(req.query.limit))
      .sort({ createdAt: -1 });

    const guestRole = await Call.find({
      guestId: req.query.userId,
    })
      .sort({ createdAt: -1 })
      .limit(parseInt(req.query.limit));

    const meets = [...hostRole, ...guestRole];

    res.status(200).json(meets);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
