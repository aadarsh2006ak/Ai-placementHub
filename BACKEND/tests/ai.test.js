const { describe, it } = require('node:test');
const assert = require('node:assert');
const { analyzeResume, analyzeSkillGap, generateMockQuestions } = require('../src/services/ai.service');

describe('AI Placement Intelligence Unit Tests', () => {
    it('should generate valid ATS score response structure', async () => {
        const result = await analyzeResume('React, Node.js developer', 'Frontend Engineer');
        assert.ok(result);
        assert.ok(typeof result.score === 'number');
        assert.ok(Array.isArray(result.matchKeywords));
        assert.ok(Array.isArray(result.missingKeywords));
        assert.ok(Array.isArray(result.suggestions));
    });

    it('should generate valid skill gap breakdown', async () => {
        const result = await analyzeSkillGap(['React', 'Node.js'], 'Full Stack Engineer with Docker and AWS');
        assert.ok(result);
        assert.ok(Array.isArray(result.matchingSkills));
        assert.ok(Array.isArray(result.gapSkills));
        assert.ok(typeof result.recommendation === 'string');
    });

    it('should generate mock interview questions', async () => {
        const result = await generateMockQuestions('Frontend Engineer', 'React 19, Tailwind, Vite', 3);
        assert.ok(result);
        assert.ok(Array.isArray(result.questions));
        assert.ok(result.questions.length > 0);
    });
});
