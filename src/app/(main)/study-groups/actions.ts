"use server";

import { refineInterests, RefineInterestsInput } from "@/ai/flows/refine-interests";
import { z } from "zod";

const refineInterestsSchema = z.object({
  interests: z.string().min(3, "Please enter at least a few interests."),
  courseDescriptions: z.string().optional(),
  keywords: z.string().optional(),
});

export type FormState = {
  message: string;
  refinedInterests?: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function handleRefineInterests(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = refineInterestsSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    const { errors } = validatedFields.error;
    return {
      message: "Validation Error",
      issues: errors.map((issue) => issue.path.join(".") + ": " + issue.message),
    };
  }

  try {
    const result = await refineInterests(validatedFields.data as RefineInterestsInput);
    if (result && result.refinedInterests) {
      return { message: "Success", refinedInterests: result.refinedInterests };
    } else {
      return { message: "AI process failed to return refined interests." };
    }
  } catch (error) {
    console.error(error);
    return { message: "An unexpected error occurred while refining interests." };
  }
}
