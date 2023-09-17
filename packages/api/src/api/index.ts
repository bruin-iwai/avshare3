import express from 'express';
import { contentsListHandler } from '~/api/contentsListHandler';

export const apiRouter = express.Router();

apiRouter.get('/contentsList', contentsListHandler);
