import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date) => {
  const originalDate = new Date(date);
  const formatedDate = format(originalDate, "dd MMM yyyy");
  return formatedDate;
};

export function generateBlogId(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special characters
    .replace(/\s+/g, "-") // replace spaces with dashes
    .replace(/-+/g, "-"); // collapse multiple dashes
}

export const getFullName = (user) => {
  const first = user?.account?.firstName?.trim() || "";
  const last = user?.account?.lastName?.trim() || "";
  const full = `${first} ${last}`.trim();
  return full || user?.email || "User";
};

export const formatShortDate = (dateValue) => {
  if (!dateValue) return "";
  const d = new Date(dateValue);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",  // Ensures the date is displayed in UTC
  });
};
