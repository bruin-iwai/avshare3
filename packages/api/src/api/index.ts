import { Router } from 'express';
import { contentsListHandler } from './contentsListHandler';

export const apiRouter = Router().get('/contentsList', contentsListHandler);
