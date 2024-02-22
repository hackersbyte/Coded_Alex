import express from 'express';
import { filterConfig } from './firebase.controller.js';

const router = express.Router();

router.get('/firebase-config', (req, res) => {
  const config = filterConfig(firebase.app().options);
  res.json(config);
});

export default router;




