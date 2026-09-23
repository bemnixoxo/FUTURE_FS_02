import { Router, Request, Response } from 'express';
import { db } from '../db.js';

export const analyticsRouter = Router();

// GET /api/analytics
analyticsRouter.get('/', (_req: Request, res: Response) => {
  try {
    const summary = db.getAnalytics();
    res.json({ success: true, data: summary });
  } catch (error: any) {
    console.error('Error computing analytics:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve analytics' });
  }
});
