import { z } from "zod";

export const eventQuestionSchema = z.object({
  question: z
    .string()
    .nonempty("Fältet får inte vara tomt")
    .min(20, "Ange minst 20 tecken")
    .max(400, "Max 400 tecken tillåtet"),
});
