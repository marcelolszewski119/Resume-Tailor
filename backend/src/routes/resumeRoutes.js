import express from 'express';
import { tailorResume, calculateAtsScore, compareScores } from '../controllers/resumeController.js';

const router = express.Router();

/**
 * POST /api/tailor
 * Tailor resume based on job description using AI
 */
router.post('/tailor', tailorResume);

/**
 * POST /api/ats-score
 * Calculate ATS score for a resume
 */
router.post('/ats-score', calculateAtsScore);

/**
 * POST /api/compare
 * Compare ATS scores before and after
 */
router.post('/compare', compareScores);

export default router;
