import express from 'express';
import { getData } from '../controllers/statisticController';

const router = express.Router();

router.get('/', getData)

export { router as statisticRoutes };