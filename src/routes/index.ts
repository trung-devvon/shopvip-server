import { Application } from 'express';
import accessRoutes from './access.route';
import { apiKey, checkPermission } from '@auth/checkAuth';

export const registerRoutes = (app: Application, basePath: string = '/api/v1') => {
  app.use(apiKey)
  app.use(checkPermission('0000'))
  app.use(`${basePath}/access`, accessRoutes);
};