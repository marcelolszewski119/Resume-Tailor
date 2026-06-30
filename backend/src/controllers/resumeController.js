import { tailorResumeWithAI } from '../services/openaiService.js';
import { calculateATSScore } from '../utils/atsUtils.js';

/**
 * POST /api/tailor
 * Tailor resume based on job description
 */
export const tailorResume = async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;

    if (!resume || !jobDescription) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Both resume and jobDescription are required'
      });
    }

    // Calculate ATS score for original resume
    const originalAtsScore = calculateATSScore(resume, jobDescription);

    // Tailor resume using OpenAI
    const tailoredResume = await tailorResumeWithAI(resume, jobDescription);

    // Calculate ATS score for tailored resume
    const tailoredAtsScore = calculateATSScore(tailoredResume, jobDescription);

    res.json({
      success: true,
      originalResume: resume,
      tailoredResume: tailoredResume,
      originalAtsScore: originalAtsScore,
      tailoredAtsScore: tailoredAtsScore,
      improvement: tailoredAtsScore - originalAtsScore
    });
  } catch (error) {
    console.error('Error in tailorResume:', error);
    res.status(500).json({
      error: 'Failed to tailor resume',
      message: error.message
    });
  }
};

/**
 * POST /api/ats-score
 * Calculate ATS score for a resume
 */
export const calculateAtsScore = async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;

    if (!resume || !jobDescription) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Both resume and jobDescription are required'
      });
    }

    const atsScore = calculateATSScore(resume, jobDescription);

    res.json({
      success: true,
      atsScore: atsScore,
      resume: resume
    });
  } catch (error) {
    console.error('Error in calculateAtsScore:', error);
    res.status(500).json({
      error: 'Failed to calculate ATS score',
      message: error.message
    });
  }
};

/**
 * POST /api/compare
 * Compare ATS scores before and after
 */
export const compareScores = async (req, res) => {
  try {
    const { originalResume, tailoredResume, jobDescription } = req.body;

    if (!originalResume || !tailoredResume || !jobDescription) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'originalResume, tailoredResume, and jobDescription are required'
      });
    }

    const originalScore = calculateATSScore(originalResume, jobDescription);
    const tailoredScore = calculateATSScore(tailoredResume, jobDescription);

    res.json({
      success: true,
      comparison: {
        originalScore: originalScore,
        tailoredScore: tailoredScore,
        improvement: tailoredScore - originalScore,
        improvementPercentage: ((tailoredScore - originalScore) / originalScore * 100).toFixed(2)
      }
    });
  } catch (error) {
    console.error('Error in compareScores:', error);
    res.status(500).json({
      error: 'Failed to compare scores',
      message: error.message
    });
  }
};