import { z } from "zod";

export interface ProfileData {
  name: string;
  email: string;
  bio: string;
  image: string;
}

export const profileSchema = z.object({
  name: z.string({ message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  bio: z.string(),
  image: z.string().url({ message: "Invalid URL" }),
});
