import React from "react"

interface TriStateFieldProps {
  label: string
  name: string
  value: boolean | null
  onChange: (name: string, value: boolean | null) => void
}

export function TriStateField({ label, name, value, onChange }: TriStateFieldProps) {
  const nextValue = value === null ? true : value === true ? false : null
  const display = value === null ? "Any" : value ? "Yes" : "No"
  const color = value === null ? "bg-gray-200" : "bg-gray-300"

  return (
    <div className="flex items-center gap-2 mt-2">
      <label className="text-sm text-gray-700 cursor-pointer">{label}</label>
      <button
        type="button"
        className={`px-3 py-1 rounded-full text-sm font-medium ${color} text-gray-700`}
        onClick={() => onChange(name, nextValue)}
      >
        {display}
      </button>
    </div>
  )
}
