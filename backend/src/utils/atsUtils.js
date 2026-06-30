/**
 * Calculate ATS score based on resume and job description
 * Score ranges from 0-100
 */
export const calculateATSScore = (resume, jobDescription) => {
  let score = 0;
  const maxScore = 100;

  if (!resume || !jobDescription) {
    return 0;
  }

  const resumeText = resume.toLowerCase();
  const jobText = jobDescription.toLowerCase();

  // Extract keywords from job description
  const jobKeywords = extractKeywords(jobText);
  
  // Calculate keyword match percentage
  const keywordMatches = jobKeywords.filter(keyword => 
    resumeText.includes(keyword)
  ).length;
  
  const keywordScore = (keywordMatches / Math.max(jobKeywords.length, 1)) * 40;
  score += keywordScore;

  // Check for required sections
  const sections = {
    'experience': 10,
    'education': 10,
    'skills': 10,
    'contact': 5,
    'summary': 5,
    'projects': 10
  };

  for (const [section, points] of Object.entries(sections)) {
    if (resumeText.includes(section) || resumeText.includes(section.replace('s', ''))) {
      score += points;
    }
  }

  // Format checking
  if (resumeText.includes('email') && resumeText.includes('@')) {
    score += 5;
  }
  if (resumeText.includes('phone') || /\d{3}-\d{3}-\d{4}|\d{3}\.\d{3}\.\d{4}|\(\d{3}\)\s?\d{3}-\d{4}/.test(resumeText)) {
    score += 5;
  }

  // Normalize to 0-100 range
  score = Math.min(score, maxScore);
  score = Math.max(score, 0);

  return Math.round(score);
};

/**
 * Extract keywords from text
 */
export const extractKeywords = (text) => {
  // Common stop words to exclude
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'should', 'could', 'may', 'might', 'can', 'it', 'this', 'that',
    'what', 'which', 'who', 'where', 'when', 'why', 'how'
  ]);

  // Split and process text
  const words = text
    .toLowerCase()
    .split(/\W+/)
    .filter(word => word.length > 2 && !stopWords.has(word));

  // Count word frequencies
  const frequencies = {};
  words.forEach(word => {
    frequencies[word] = (frequencies[word] || 0) + 1;
  });

  // Sort by frequency and return top keywords
  return Object.entries(frequencies)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(entry => entry[0]);
};

/**
 * Analyze resume for formatting issues
 */
export const analyzeResumeFormat = (resume) => {
  const analysis = {
    hasContact: false,
    hasSummary: false,
    hasExperience: false,
    hasEducation: false,
    hasSkills: false,
    hasProjects: false,
    issues: []
  };

  const text = resume.toLowerCase();

  // Check for sections
  analysis.hasContact = /email|phone|contact|linkedin|github/.test(text);
  analysis.hasSummary = /summary|objective|profile|about/.test(text);
  analysis.hasExperience = /experience|work|employment|career/.test(text);
  analysis.hasEducation = /education|degree|university|college|school/.test(text);
  analysis.hasSkills = /skills|competencies|expertise|technical/.test(text);
  analysis.hasProjects = /projects|portfolio|achievements/.test(text);

  // Identify missing sections
  if (!analysis.hasContact) analysis.issues.push('Missing contact information');
  if (!analysis.hasExperience) analysis.issues.push('Missing work experience section');
  if (!analysis.hasEducation) analysis.issues.push('Missing education section');
  if (!analysis.hasSkills) analysis.issues.push('Missing skills section');

  return analysis;
};