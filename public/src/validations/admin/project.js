import { z } from "zod";
import { validateUrl } from "./profile";

export const projectSchema = z
  .object({
    _id: z.string().optional(),
    project: z.string().nonempty("Ogiltigt projektnamn"),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Ogiltigt datum",
    }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Ogiltigt datum",
    }),
    github: z
      .string()
      .url()
      .refine((val) => validateUrl(val), {
        message: "Ogiltig URL",
      }),
    description: z.string().min(100, "Ange minst 100 tecken").max(2000, "Max 2000 tecken tillåtet"),
    colleagues: z.array(z.string()).optional(),
    techStack: z.array(z.string().nonempty("Ogiltig teknologi")).min(3).max(10),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      const diffInDays = (end - start) / (1000 * 60 * 60 * 24);
      return diffInDays >= 7;
    },
    {
      message: "Slutdatum måste vara minst en vecka efter startdatum",
      path: ["endDate"],
    }
  );
