import React, { useState, useEffect, useRef } from "react"
import { ChevronDown, X } from "lucide-react"

interface PopupListProps {
  label: string
  name: string
  value: string | null
  options: string[]
  onChange: (name: string, value: string | null) => void
  placeholder?: string
  resetTrigger?: number
  maxHeight?: string
}

export function PopupList({ 
  label, 
  name, 
  value, 
  options, 
  onChange, 
  placeholder = "Select an option...",
  resetTrigger,
  maxHeight = "max-h-48"
}: PopupListProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [localValue, setLocalValue] = useState(value || "")
  const [filteredOptions, setFilteredOptions] = useState(options)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Update local value when external value changes or on reset
  useEffect(() => {
    setLocalValue(value || "")
    setSearchTerm("")
  }, [value, resetTrigger])

  // Filter options based on search term
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredOptions(options)
    } else {
      const filtered = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredOptions(filtered)
    }
  }, [searchTerm, options])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleOptionSelect = (option: string) => {
    setLocalValue(option)
    onChange(name, option)
    setIsOpen(false)
    setSearchTerm("")
  }

  const handleClear = () => {
    setLocalValue("")
    onChange(name, null)
    setIsOpen(false)
    setSearchTerm("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Input is read-only, no changes allowed
  }

  const handleInputBlur = () => {
    // No custom values, no blur handling needed
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (filteredOptions.length > 0) {
        handleOptionSelect(filteredOptions[0])
      }
    } else if (e.key === "Escape") {
      setIsOpen(false)
      setSearchTerm("")
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setIsOpen(true)
    }
  }

  const displayValue = localValue || ""
  const hasValue = localValue && localValue.length > 0

  return (
    <div className="flex flex-col gap-1 relative" ref={dropdownRef}>
      <label className="text-sm text-gray-700" htmlFor={name}>
        {label}
      </label>
      
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          name={name}
          id={name}
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          readOnly={true}
          className={`
            w-full border rounded px-3 py-2 pr-16 
            focus:ring-2 focus:ring-blue-200 focus:outline-none
            cursor-pointer
            ${hasValue ? 'bg-white' : 'bg-gray-50'}
          `}
        />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {hasValue && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 p-1"
              tabIndex={-1}
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-gray-600 p-1"
            tabIndex={-1}
          >
            <ChevronDown 
              className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className={`
          absolute top-full left-0 right-0 z-50 mt-1
          bg-white border border-gray-200 rounded-lg shadow-lg
          ${maxHeight} overflow-hidden
        `}>
          <div className="overflow-y-auto max-h-40">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleOptionSelect(option)}
                  className={`
                    w-full text-left px-3 py-2 text-sm hover:bg-gray-50
                    ${localValue === option ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}
                  `}
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500 italic">
                No options available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
