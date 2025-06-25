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
}

export function NumberField({ label, nameFrom, nameTo, filters, min, max, step, setFilters }: NumberFieldProps) {
  const [localFrom, setLocalFrom] = useState(String(filters[nameFrom] ?? ""))
  const [localTo, setLocalTo] = useState(String(filters[nameTo] ?? ""))
  const isFilledFrom = localFrom !== ""
  const isFilledTo = localTo !== ""

  const handleSliderChange = ([from, to]: [number, number]) => {
    setLocalFrom(String(from))
    setLocalTo(String(to))
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
    var valFrom = parseNumber(localFrom) || min
    var valTo = parseNumber(localTo) || max

    const vals = normalizeRange(valFrom, valTo)

    setFilters(f => ({
        ...f,
        [nameFrom]: vals[0],
        [nameTo]: vals[1]
    }))
    setLocalFrom(String(valFrom))
    setLocalTo(String(valTo))
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
                value={localFrom}
                onChange={e => {
                if (/^\d*[.,]?\d*$/.test(e.target.value) || e.target.value === "") {
                    setLocalFrom(e.target.value)
                }
                }}
                onBlur={_ => {
                    updateFilters()
                }}
                className={
                `bg-gray-100 rounded px-2 py-1 focus:ring-2 focus:ring-blue-200 outline-none transition-colors w-24 text-center ` +
                (isFilledFrom ? "text-gray-700 bg-blue-500 placeholder-white" : "text-gray-700")
                }
                placeholder={`${min}`}
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
                value={localTo}
                onChange={e => {
                if (/^\d*[.,]?\d*$/.test(e.target.value) || e.target.value === "") {
                    setLocalTo(e.target.value)
                }
                }}
                onBlur={_ => {
                    updateFilters()
                }}
                className={
                `bg-gray-100 rounded px-2 py-1 focus:ring-2 focus:ring-blue-200 outline-none transition-colors w-24 text-center ` +
                (isFilledTo ? "text-gray-700 bg-blue-500 placeholder-white" : "text-gray-700")
                }
                placeholder={`${max}`}
                autoComplete="off"
            />
        </div>
      </div>
        <Slider
            className="mt-4"
            min={min}
            max={max}
            value={[parseNumber(localFrom) || min, parseNumber(localTo) || max]}
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
