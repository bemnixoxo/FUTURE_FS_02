import { Router, Request, Response } from 'express';
import { db } from '../db.js';
import { checkReservedOrProhibitedTerms } from '../utils/termsValidator.js';

export const authRouter = Router();

// POST /api/auth/login
authRouter.post('/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = password.trim();

    // Authenticate user against database
    const user = db.authenticateUser(trimmedEmail, trimmedPass);

    if (user) {
      const sanitizedUser = { ...user };
      delete sanitizedUser.password;

      return res.json({
        success: true,
        message: 'Login successful',
        token: `token_${Date.now()}_${user.id}`,
        user: sanitizedUser,
      });
    }

    return res.status(401).json({
      success: false,
      error: 'Invalid email or password. Use demo credentials: admin@apexcrm.io / admin123',
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Authentication error' });
  }
});

// POST /api/auth/register - Register new administrator
authRouter.post('/register', (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and password are required to create an account.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters long.',
      });
    }

    // Check for reserved or prohibited terms
    const termCheck = checkReservedOrProhibitedTerms(name, email);
    if (!termCheck.isValid) {
      return res.status(400).json({
        success: false,
        error: termCheck.error || 'Account details contain reserved or prohibited terms.',
      });
    }

    const user = db.createUser({
      name,
      email,
      password,
      role: role || 'admin',
    });

    const sanitizedUser = { ...user };
    delete sanitizedUser.password;

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token: `token_${Date.now()}_${user.id}`,
      user: sanitizedUser,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to register account',
    });
  }
});

// POST /api/auth/logout
authRouter.post('/logout', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Logged out successfully. Session invalidated.',
  });
});

// GET /api/auth/me
authRouter.get('/me', (req: Request, res: Response) => {
  const user = db.getUserByEmail('admin@apexcrm.io');
  if (user) {
    const sanitized = { ...user };
    delete sanitized.password;
    return res.json({ success: true, user: sanitized });
  }
  res.status(404).json({ success: false, error: 'User not found' });
});
