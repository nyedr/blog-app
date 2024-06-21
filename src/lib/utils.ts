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

export const rawToString = (rawString: string) => {
  const convertLiteralToNewlines = (input: string) =>
    input.replace(/\\n/g, "\n");

  const decodeHTMLEntities = (text: string) => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(
      `<!doctype html><body>${text}`,
      "text/html"
    );
    return dom.body.textContent;
  };

  return decodeHTMLEntities(
    convertLiteralToNewlines(decodeURIComponent(rawString))
  );
};

export function slugify(string: string) {
  return string
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatDateTime = (dateString: Date): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZoneName: "short",
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const timeFormatter = new Intl.DateTimeFormat("en-US", timeOptions);
  const dateFormatter = new Intl.DateTimeFormat("en-US", dateOptions);

  const timePart = timeFormatter.format(date);
  const datePart = dateFormatter.format(date);

  return `${timePart} • ${datePart}`;
};

// capitalize function
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// truncate
export function truncate(str: string, length: number) {
  return str.length > length ? str.slice(0, length) + "..." : str;
}
