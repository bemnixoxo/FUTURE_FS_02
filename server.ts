import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { leadsRouter } from './server/routes/leads.js';
import { authRouter } from './server/routes/auth.js';
import { analyticsRouter } from './server/routes/analytics.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // CORS-friendly headers for embeddable forms and cross-origin testing
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-name');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // API Routes
  app.use('/api/leads', leadsRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/analytics', analyticsRouter);

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'healthy', version: '1.0.0', timestamp: new Date().toISOString() });
  });

  if (process.env.NODE_ENV === 'production') {
    // Serve static files from dist
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    // Dev mode: mount Vite middlewares
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ApexCRM Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
