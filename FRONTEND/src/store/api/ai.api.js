import { apiSlice } from '../slices/apiSlice';

/**
 * AI features API endpoints injected into the base apiSlice.
 */
export const aiApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    analyzeResume: builder.mutation({
      query: (data) => ({
        url: '/ai/analyze-resume',
        method: 'POST',
        body: data,
      }),
    }),
    analyzeSkillGap: builder.mutation({
      query: (data) => ({
        url: '/ai/skill-gap',
        method: 'POST',
        body: data,
      }),
    }),
    generateQuestions: builder.mutation({
      query: (data) => ({
        url: '/ai/mock-questions',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useAnalyzeResumeMutation,
  useAnalyzeSkillGapMutation,
  useGenerateQuestionsMutation,
} = aiApi;
