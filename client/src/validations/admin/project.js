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
    website: z
      .string()
      .url()
      .optional()
      .refine((val) => (val ? validateUrl(val) : true), {
        message: "Ogiltig URL",
      }),
    description: z
      .string()
      .nullable()
      .optional()
      .refine(
        (value) =>
          value === "" || value === undefined || (value.length >= 100 && value.length <= 2000),
        {
          message: "Ange minst 100 tecken och max 2000 tecken tillåtet",
        }
      ),
    colleagues: z
      .union([
        z.array(
          z.object({
            _id: z.string(),
            name: z.string(),
          })
        ),
        z.array(z.string()),
      ])
      .optional(),
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
    images: z
      .preprocess(
        (val) => {
          if (val instanceof FileList) return Array.from(val);
          if (!val) return [];
          if (Array.isArray(val)) {
            return val.filter((item) => item);
          }
          return [];
        },
        z
          .array(
            z.union([
              z
                .instanceof(File, { message: "En bild måste laddas upp" })
                .refine((file) => file.type === "image/webp", {
                  message: "Endast WEBP-format är tillåtet",
                }),
              z.string().refine(validateUrl, { message: "Ogiltig bild-url" }),
            ])
          )
          .optional()
      )
      .default([]),
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
