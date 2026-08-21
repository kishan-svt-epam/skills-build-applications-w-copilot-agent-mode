import { Router } from 'express';
import { Activity } from '../models.js';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(await Activity.find().populate('user').sort({ recordedAt: -1 }));
});

router.post('/', async (request, response) => {
  const activity = await Activity.create(request.body);
  response.status(201).json(activity);
});

export default router;