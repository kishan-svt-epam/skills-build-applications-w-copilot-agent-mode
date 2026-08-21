import { Router } from 'express';
import { Leaderboard } from '../models.js';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(await Leaderboard.find().populate('user').sort({ points: -1 }));
});

router.post('/', async (request, response) => {
  const entry = await Leaderboard.findOneAndUpdate(
    { user: request.body.user },
    { $set: request.body },
    { new: true, upsert: true, runValidators: true },
  );
  response.status(201).json(entry);
});

export default router;