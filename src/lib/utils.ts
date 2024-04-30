import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateReadTime = (wordCount: number) => {
  const wordsPerMinute = 200;
  const minutes = wordCount / wordsPerMinute;
  const readTime = Math.ceil(minutes);
  return readTime;
};
