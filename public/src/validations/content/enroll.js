import { z } from "zod";

export const enrollmentSchema = z.object({
  name: z.string().nonempty("Namn får inte vara tomt"),
  org: z.string().nonempty("Organisation eller företag får inte vara tomt"),
});
