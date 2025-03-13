import { z } from "zod";
import { validateUrl } from "./profile";

export const eventSchema = z.object({
  event: z.string().nonempty("Ogiltigt namn"),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Ogiltigt datum",
  }),
  description: z.string().min(100, "Ange minst 100 tecken").max(2000, "Max 2000 tecken tillåtet"),
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
