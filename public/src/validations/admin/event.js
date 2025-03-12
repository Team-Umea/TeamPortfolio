import { z } from "zod";
import { validateUrl } from "./profile";

export const eventSchema = z.object({
  event: z.string().nonempty("Ogiltigt namn"),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Ogiltigt datum",
  }),
  description: z.string().min(50, "Ange minst 50 tecken").max(500, "Max 500 tecken tillåtet"),
  image: z.union([
    z
      .instanceof(File, "En bild måste laddas upp")
      .refine((file) => !!file, {
        message: "En bild måste laddas upp",
      })
      .refine((file) => file.type === "image/webp", {
        message: "Endast WEBP-format är tillåtet",
      }),
    z.string().refine(validateUrl, "Ogiltig bild-url"),
  ]),
});
