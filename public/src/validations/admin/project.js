import { z } from "zod";
import { validateUrl } from "./profile";

export const projectSchema = z
  .object({
    _id: z.string().optional(),
    project: z.string().nonempty("Ogiltigt projektnamn"),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Ogiltigt datum",
    }),
    endDate: z
      .string()
      .optional()
      .refine((date) => (!date ? true : !isNaN(Date.parse(date))), {
        message: "Ogiltigt datum",
      }),
    github: z
      .string()
      .url()
      .refine((val) => validateUrl(val) && val.includes("github.com"), {
        message: "Ogiltig github URL",
      }),
    description: z
      .string()
      .min(100, "Ange minst 100 tecken")
      .max(2000, "Max 2000 tecken tillåtet")
      .optional(),
    colleagues: z.array(z.string()).optional(),
    techStack: z
      .array(z.string())
      .min(3, "Minst 3 teknologier krävs")
      .max(10, "Max 10 teknologier tillåtet")
      .refine(
        (stack) => {
          const nonEmptyItems = stack.filter((tech) => tech.trim() !== "").length;
          return nonEmptyItems >= 3;
        },
        {
          message: "Minst 3 av teknologierna måste vara ifyllda",
          path: ["techStack"],
        }
      ),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      const diffInDays = (end - start) / (1000 * 60 * 60 * 24);

      return !data.endDate ? true : diffInDays >= 7;
    },
    {
      message: "Slutdatum måste vara minst en vecka efter startdatum",
      path: ["endDate"],
    }
  );
