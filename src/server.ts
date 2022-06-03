import express, { Router } from 'express';

import cors from 'cors';

import morgan from 'morgan';
import mongooseWorker from './config/mongoose';

import * as dotenv from 'dotenv';
dotenv.config();

import { MONGODB_URI } from './helpers/secrets';
import { json, urlencoded } from 'body-parser';

export default function initializeServer(router: Router) {
  const app = express();

  // Logging
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.use(urlencoded({ extended: false }));
  app.use(json());
  app.use(cors());

    // Run Mongoose
    mongooseWorker(MONGODB_URI);

  app.use('/api', router);

  return app;
}
