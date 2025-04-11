import { Application } from 'express';
import accessRoutes from './access.route';

export const registerRoutes = (app: Application, basePath: string = '/api/v1') => {
  app.use(`${basePath}/access`, accessRoutes);
};