import { z } from "zod";

const swedishPhoneNumberRegex = /^(?:\+46|0)(?:7[0-9]{8}|[1-9][0-9]{7})$/;

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const profileSchema = z.object({
  name: z.string().nonempty("Ogiltigt namn"),
  email: z.string().email("Ogiltig mejladress").nonempty("Ogiltig mejladress"),
  age: z.number().positive(),
  phone: z
    .string()
    .refine((value) => swedishPhoneNumberRegex.test(value), "Ogiltigt telefonnummer"),
  title: z.string().nonempty("Ogiltig title"),
  linkedin: z.string().refine(validateUrl, "Ogiltig url"),
  github: z.string().refine(validateUrl, "Ogiltig url"),
  portfolio: z.string().refine(validateUrl, "Ogiltig url").optional(),
  bio: z.string().min(50, "Ange minst 50 tecken").max(500, "Max 500 tecken tillåtet"),
  profileImage: z.union([
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
