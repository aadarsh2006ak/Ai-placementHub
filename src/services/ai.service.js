const logger = require('../config/logger');

const geminiApiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

async function callGemini(prompt, responseJson = true) {
    if (!geminiApiKey) {
        logger.warn('GEMINI_API_KEY is not configured. Falling back to mock AI generation.');
        return null;
    }

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: responseJson ? {
                    responseMimeType: 'application/json'
                } : undefined
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const outputText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!outputText) {
            throw new Error('Empty response from Gemini API');
        }

        return responseJson ? JSON.parse(outputText) : outputText;
    } catch (err) {
        logger.error('Error calling Gemini API:', err);
        throw err;
    }
}

// 1. Analyze Resume vs Job Description (ATS Score)
async function analyzeResume(resumeText, jobDescription) {
    const fallback = {
        score: 75,
        matchKeywords: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB'],
        missingKeywords: ['Redis', 'Docker', 'AWS'],
        suggestions: [
            'Add projects showing experience with cloud deployment.',
            'Include metrics or achievements in your experience section.'
        ],
        summary: 'The resume shows strong foundational web development skills matching about 75% of the requirements.'
    };

    if (!geminiApiKey) return fallback;

    const prompt = `
    You are an AI ATS (Applicant Tracking System) parser.
    Analyze the following Resume text against the Job Description.
    Resume:
    """
    ${resumeText}
    """
    
    Job Description:
    """
    ${jobDescription}
    """
    
    Return a JSON response with the following keys:
    - score (a number between 0 and 100 representing match percentage)
    - matchKeywords (array of strings matching requirements)
    - missingKeywords (array of strings from Job Description not found in Resume)
    - suggestions (array of helpful hints to improve the score)
    - summary (a 2-3 sentence overview of the candidate's fit)
    `;

    try {
        return await callGemini(prompt, true) || fallback;
    } catch (err) {
        logger.error('Failed to analyze resume, returning mock fallback');
        return fallback;
    }
}

// 2. Skill Gap Analysis
async function analyzeSkillGap(studentSkills, jobDescription) {
    const fallback = {
        matchingSkills: ['JavaScript', 'HTML', 'CSS'],
        gapSkills: ['TypeScript', 'Kubernetes'],
        recommendation: 'Learn TypeScript and build a project using Docker/Kubernetes.'
    };

    if (!geminiApiKey) return fallback;

    const prompt = `
    Compare the following student skills against the job description.
    Student Skills: ${JSON.stringify(studentSkills)}
    Job Description:
    """
    ${jobDescription}
    """
    
    Return a JSON response with the following keys:
    - matchingSkills (array of strings)
    - gapSkills (array of strings representing requirements in the job description that the student lacks)
    - recommendation (a string with concrete recommendations/courses to cover the gap)
    `;

    try {
        return await callGemini(prompt, true) || fallback;
    } catch (err) {
        logger.error('Failed to analyze skill gap, returning mock fallback');
        return fallback;
    }
}

// 3. Mock Interview Question Generator
async function generateMockQuestions(jobTitle, jobDescription, numQuestions = 5) {
    const fallback = {
        questions: [
            'Explain the event loop in JavaScript.',
            'What is the difference between SQL and NoSQL databases?',
            'How do you manage sessions and state in an Express app?',
            'Explain how RESTful routing works.',
            'How do you secure a Node.js Express backend?'
        ]
    };

    if (!geminiApiKey) return fallback;

    const prompt = `
    Generate ${numQuestions} technical interview questions for the role: ${jobTitle} based on this job description:
    """
    ${jobDescription}
    """
    
    Return a JSON response with a single key "questions" containing an array of strings.
    `;

    try {
        return await callGemini(prompt, true) || fallback;
    } catch (err) {
        logger.error('Failed to generate mock questions, returning mock fallback');
        return fallback;
    }
}

module.exports = {
    analyzeResume,
    analyzeSkillGap,
    generateMockQuestions
};
