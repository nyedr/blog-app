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

export function slugify(string: string) {
  return string
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// capitalize function
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// truncate
export function truncate(str: string, length: number) {
  return str.length > length ? str.slice(0, length) + "..." : str;
}
