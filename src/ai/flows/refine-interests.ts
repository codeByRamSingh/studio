'use server';

/**
 * @fileOverview An AI agent that refines user interests for study group matching.
 *
 * - refineInterests - A function that refines user interests based on course descriptions and keywords.
 * - RefineInterestsInput - The input type for the refineInterests function.
 * - RefineInterestsOutput - The return type for the refineInterests function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineInterestsInputSchema = z.object({
  interests: z
    .string()
    .describe('The initial list of interests provided by the user.'),
  courseDescriptions: z
    .string()
    .describe('The descriptions of the courses the user is taking.'),
  keywords: z
    .string()
    .describe('The keywords related to the courses and study groups.'),
});
export type RefineInterestsInput = z.infer<typeof RefineInterestsInputSchema>;

const RefineInterestsOutputSchema = z.object({
  refinedInterests:
    z.string().describe('The refined list of interests based on the input data.'),
});
export type RefineInterestsOutput = z.infer<typeof RefineInterestsOutputSchema>;

export async function refineInterests(input: RefineInterestsInput): Promise<RefineInterestsOutput> {
  return refineInterestsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refineInterestsPrompt',
  input: {schema: RefineInterestsInputSchema},
  output: {schema: RefineInterestsOutputSchema},
  prompt: `You are an AI assistant designed to refine a student\'s study interests to help them find relevant study groups and resources.

  Based on the student\'s initial interests, course descriptions, and keywords, you will generate a refined list of interests that are more specific and relevant.

  Initial Interests: {{{interests}}}
  Course Descriptions: {{{courseDescriptions}}}
  Keywords: {{{keywords}}}

  Refined Interests:`,
});

const refineInterestsFlow = ai.defineFlow(
  {
    name: 'refineInterestsFlow',
    inputSchema: RefineInterestsInputSchema,
    outputSchema: RefineInterestsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
