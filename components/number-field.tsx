import React, { useState, useEffect } from "react"
import { parseNumber } from "@/lib/utils"
import { FiltersData } from "@/types/filters"
import Slider from "react-slider"

interface NumberFieldProps {
  label: string
  nameFrom: keyof FiltersData
  nameTo: keyof FiltersData
  filters: FiltersData
  min: number
  max: number
  step: number
  setFilters: React.Dispatch<React.SetStateAction<FiltersData>>
  isInteger?: boolean
  resetTrigger?: number
}

export function NumberField({ label, nameFrom, nameTo, filters, min, max, step, setFilters, isInteger, resetTrigger }: NumberFieldProps) {
  const [localFrom, setLocalFrom] = useState("")
  const [localTo, setLocalTo] = useState("")
  const [inputFrom, setInputFrom] = useState("")
  const [inputTo, setInputTo] = useState("")
  const [sliderFrom, setSliderFrom] = useState<number>(filters[nameFrom] as number ?? min)
  const [sliderTo, setSliderTo] = useState<number>(filters[nameTo] as number ?? max)

  const formatValue = (val: number, floor: boolean) => {
    if (isInteger) {
      return String(floor ? Math.floor(val) : Math.ceil(val))
    }
    
    return val.toFixed(2)
  }

  const updateFrom = (v: number) => {
    const formatted = formatValue(v, true)
    setLocalFrom(formatted)
    setInputFrom(formatted)
    setSliderFrom(v)
  }

  const updateTo = (v: number) => {
    const formatted = formatValue(v, false)
    setLocalTo(formatted)
    setInputTo(formatted)
    setSliderTo(v)
  }

  useEffect(() => {
    if (filters[nameFrom] !== undefined && filters[nameTo] !== undefined) {
      updateFrom(filters[nameFrom] as number)
      updateTo(filters[nameTo] as number)
    } else {
      setInputFrom("")
      setInputTo("")
    }
    
    setSliderFrom(filters[nameFrom] as number ?? min)
    setSliderTo(filters[nameTo] as number ?? max)
  }, [resetTrigger])

  const handleSliderChange = ([from, to]: [number, number]) => {
    updateFrom(from)
    updateTo(to)
  }

  function normalizeRange(from: number, to: number): [number, number] {
    from = Math.max(min, Math.min(from, max - step));
    to = Math.max(min + step, Math.min(to, max));

    if (from === to) {
        if (from === max) {
            from = to - step;
        } else {
            to = from + step;
        }
    }

    return [from, to];
  }

  const updateFilters = () => {
    var valFrom = parseNumber(inputFrom) || min
    var valTo = parseNumber(inputTo) || max

    const vals = normalizeRange(valFrom, valTo)

    setFilters(f => ({
        ...f,
        [nameFrom]: vals[0],
        [nameTo]: vals[1]
    }))
    updateFrom(vals[0])
    updateTo(vals[1])
  }

  const handleFromInputChange = (value: string) => {
    if (/^\d*[.,]?\d*$/.test(value) || value === "") {
      setInputFrom(value)
    }
  }

  const handleToInputChange = (value: string) => {
    if (/^\d*[.,]?\d*$/.test(value) || value === "") {
      setInputTo(value)
    }
  }

  const handleFromInputFinish = () => {
    const v = parseNumber(inputFrom)
    if (v !== null) {
      updateFrom(v)
    } else {
      setInputFrom(localFrom)
    }
    updateFilters()
  }

  const handleToInputFinish = () => {
    const v = parseNumber(inputTo)
    if (v !== null) {
      updateTo(v)
    } else {
      setInputTo(localTo)
    }
    updateFilters()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, isFromInput: boolean) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (isFromInput) {
        handleFromInputFinish()
      } else {
        handleToInputFinish()
      }
      e.currentTarget.blur()
    }
  }

  return (
    <div className="mb-4">
      <div className="flex flex-wrap justify-between">
        <label className="text-sm text-gray-700 w-2/5 justify-self-start" htmlFor={nameFrom}>{label}</label>
        <div className="flex flex-wrap items-center  w-3/5">
            <input
                type="text"
                inputMode="decimal"
                pattern="^\d*[.,]?\d*$"
                step={step}
                name={nameFrom}
                id={nameFrom}
                value={inputFrom}
                onChange={e => handleFromInputChange(e.target.value)}
                onBlur={handleFromInputFinish}
                onKeyDown={e => handleKeyDown(e, true)}
                className={
                  "bg-gray-100 rounded px-2 py-1 focus:ring-2 focus:ring-blue-200 outline-none transition-colors w-24 text-center text-gray-700"
                }
                placeholder={`${formatValue(min, true)}`}
                autoComplete="off"
            />
            <span className="text-gray-400 px-2">–</span>
            <input
                type="text"
                inputMode="decimal"
                pattern="^\d*[.,]?\d*$"
                step={step}
                name={nameTo}
                id={nameTo}
                value={inputTo}
                onChange={e => handleToInputChange(e.target.value)}
                onBlur={handleToInputFinish}
                onKeyDown={e => handleKeyDown(e, false)}
                className={
                  "bg-gray-100 rounded px-2 py-1 focus:ring-2 focus:ring-blue-200 outline-none transition-colors w-24 text-center text-gray-700"
                }
                placeholder={`${formatValue(max, false)}`}
                autoComplete="off"
            />
        </div>
      </div>
        <Slider
            className="mt-4"
            min={min}
            max={max}
            value={[sliderFrom, sliderTo]}
            onChange={handleSliderChange}
            onAfterChange={updateFilters}
            step={step}
            renderThumb={(props: any) => {
                const { key, ...restProps } = props;
              return <div key={key} {...restProps} className="bg-blue-500 rounded-full w-4 h-4 translate-y-[-25%]" />
            }}
            renderTrack={(props: any, _: any) => {
                const { key, ...restProps } = props;
                return <div key={key} {...restProps} className="bg-gray-300 h-2 rounded-full" />
            }}
        />
    </div>
  )
}
