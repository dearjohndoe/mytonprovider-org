import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPublicKey = (key: string) => {
  if (key.length <= 10) return key
  return `${key.substring(0, 6)}...${key.substring(key.length - 4)}`
}

export const getSortIconType = (
  field: string,
  sortField: string | null,
  sortDirection: "asc" | "desc"
): "up" | "down" | null => {
  if (sortField !== field) return null
  return sortDirection === "asc" ? "up" : "down"
}

export const copyToClipboard = (
  text: string,
  setCopiedKey?: (key: string | null) => void
) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      if (setCopiedKey) {
        setCopiedKey(text)
        setTimeout(() => setCopiedKey(null), 150)
      }
    })
    .catch((err) => {
      console.error("Failed to copy: ", err)
    })
}
