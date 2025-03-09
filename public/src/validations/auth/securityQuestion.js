import { z } from "zod";

export const securityQuestionSchema = z.object({
  securityQuestion: z.string(),
});
