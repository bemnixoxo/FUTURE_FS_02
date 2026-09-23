import { Router, Request, Response } from 'express';
import { db } from '../db.js';
import { checkReservedOrProhibitedTerms } from '../utils/termsValidator.js';

export const leadsRouter = Router();

// GET /api/leads - List all leads with query filters
leadsRouter.get('/', (req: Request, res: Response) => {
  try {
    const { status, search, source, sortBy } = req.query;
    const leads = db.getLeads({
      status: typeof status === 'string' ? status : undefined,
      search: typeof search === 'string' ? search : undefined,
      source: typeof source === 'string' ? source : undefined,
      sortBy: typeof sortBy === 'string' ? sortBy : undefined,
    });
    res.json({ success: true, count: leads.length, data: leads });
  } catch (error: any) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch leads' });
  }
});

// GET /api/leads/:id - Get single lead details
leadsRouter.get('/:id', (req: Request, res: Response) => {
  try {
    const lead = db.getLeadById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }
    res.json({ success: true, data: lead });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch lead' });
  }
});

// POST /api/leads - Create new lead (Used by both Website Contact Form & Admin Manual Entry)
leadsRouter.post('/', (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      source,
      serviceInterested,
      budget,
      estimatedValue,
      message,
      priority,
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required fields.',
      });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    // Check for reserved or prohibited terms
    const termCheck = checkReservedOrProhibitedTerms(name, company, message, email);
    if (!termCheck.isValid) {
      return res.status(400).json({
        success: false,
        error: termCheck.error || 'Submission contains reserved or prohibited terms.',
      });
    }

    const newLead = db.createLead({
      name,
      email,
      phone,
      company,
      source: source || 'Website Contact Form',
      serviceInterested: serviceInterested || 'General Inquiry',
      budget,
      estimatedValue: estimatedValue ? Number(estimatedValue) : undefined,
      message,
      priority: priority || 'medium',
    });

    res.status(201).json({
      success: true,
      message: 'Lead successfully captured and routed to CRM.',
      data: newLead,
    });
  } catch (error: any) {
    console.error('Error creating lead:', error);
    res.status(500).json({ success: false, error: 'Failed to create lead' });
  }
});

// PATCH /api/leads/:id - Update lead (status, priority, assignedTo, etc.)
leadsRouter.patch('/:id', (req: Request, res: Response) => {
  try {
    const { status, priority, assignedTo, budget, estimatedValue, serviceInterested, company } = req.body;
    const actor = req.headers['x-admin-name']?.toString() || 'Admin';

    const updated = db.updateLead(
      req.params.id,
      {
        status,
        priority,
        assignedTo,
        budget,
        estimatedValue: estimatedValue !== undefined ? Number(estimatedValue) : undefined,
        serviceInterested,
        company,
      },
      actor
    );

    if (!updated) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }

    res.json({
      success: true,
      message: 'Lead updated successfully',
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to update lead' });
  }
});

// POST /api/leads/:id/notes - Add follow-up note to lead
leadsRouter.post('/:id/notes', (req: Request, res: Response) => {
  try {
    const { content, category } = req.body;
    const author = req.headers['x-admin-name']?.toString() || 'Sarah Jenkins';

    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, error: 'Note content cannot be empty' });
    }

    const updated = db.addNote(req.params.id, content, category || 'general', author);

    if (!updated) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }

    res.status(201).json({
      success: true,
      message: 'Follow-up note recorded',
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to add note' });
  }
});

// DELETE /api/leads/:id - Delete lead
leadsRouter.delete('/:id', (req: Request, res: Response) => {
  try {
    const deleted = db.deleteLead(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }
    res.json({ success: true, message: 'Lead successfully deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to delete lead' });
  }
});

// POST /api/leads/batch - Bulk action (e.g. mark multiple as contacted or converted)
leadsRouter.post('/batch/update-status', (req: Request, res: Response) => {
  try {
    const { leadIds, status } = req.body;
    const actor = req.headers['x-admin-name']?.toString() || 'Admin';

    if (!Array.isArray(leadIds) || !status) {
      return res.status(400).json({ success: false, error: 'leadIds array and status are required' });
    }

    let updatedCount = 0;
    for (const id of leadIds) {
      const result = db.updateLead(id, { status }, actor);
      if (result) updatedCount++;
    }

    res.json({
      success: true,
      message: `Updated status for ${updatedCount} leads`,
      updatedCount,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Batch update failed' });
  }
});

// POST /api/leads/reset - Reset to seed default leads (useful for testing/demo)
leadsRouter.post('/reset/seed', (_req: Request, res: Response) => {
  try {
    db.resetToDefaults();
    res.json({ success: true, message: 'Leads reset to default sample dataset' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to reset leads' });
  }
});
