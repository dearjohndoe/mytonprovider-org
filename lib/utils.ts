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

export const printTime = (secs: number): string => {
  if (secs < 60) return `${secs} sec`
  
  if (secs < 3600) return `${Math.floor(secs / 60)} min ${secs % 60} sec`
  
  if (secs < 86400)
    return `${Math.floor(secs / 3600)} hr ${Math.floor((secs % 3600) / 60)} min`
  
  if (secs < 604800)
    return `${Math.floor(secs / 86400)} days ${Math.floor((secs % 86400) / 3600)} hr ${Math.floor((secs % 3600) / 60)} min`

  return `${Math.floor(secs / 86400)} days ${Math.floor((secs % 86400) / 3600)} hr`
}
