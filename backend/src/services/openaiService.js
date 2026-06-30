import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Use OpenAI to tailor resume based on job description
 */
export const tailorResumeWithAI = async (resume, jobDescription) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }

    const systemPrompt = `You are an expert resume writer and ATS optimization specialist. 
Your task is to rewrite the given resume to better match the job description while maintaining accuracy and authenticity. 
Focus on:
1. Incorporating relevant keywords from the job description
2. Highlighting skills and experiences that align with the role
3. Optimizing for ATS (Applicant Tracking System) compatibility
4. Maintaining professional language and format
5. Keeping all information truthful and factual

Return ONLY the tailored resume, with no additional explanations or metadata.`;

    const userPrompt = `Please tailor this resume to match this job description:

RESUME:
${resume}

JOB DESCRIPTION:
${jobDescription}

Provide the tailored resume only, maintaining its original structure and format where possible.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error(`Failed to tailor resume with AI: ${error.message}`);
  }
};

/**
 * Extract keywords from text using OpenAI
 */
export const extractKeywords = async (text, context = '') => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Extract the top 20 relevant keywords from the following ${context}. Return as a comma-separated list:\n\n${text}`
        }
      ],
      temperature: 0.5,
      max_tokens: 200
    });

    const keywords = response.choices[0].message.content
      .split(',')
      .map(k => k.trim().toLowerCase())
      .filter(k => k.length > 0);

    return keywords;
  } catch (error) {
    console.error('Error extracting keywords:', error);
    return [];
  }
};