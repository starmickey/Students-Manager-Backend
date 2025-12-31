import express, { type Express } from 'express';
// import { auditRoutes } from './modules/audit/audit.routes.js';

export function initExpress(): Express {
  const app = express();

  // Core middleware
  app.use(express.json());

  // Modules
  // app.use('/audit', auditRoutes);

  // Fallback
  app.use((_req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  return app;
}
