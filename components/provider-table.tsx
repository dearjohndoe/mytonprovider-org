"use client"

import React, { useState } from "react"
import type { Provider } from "@/types/provider"
import {
  Star,
  Copy,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { shortenString, getSortIconType, copyToClipboard, printTime } from "@/lib/utils"
import { ProviderDetails } from "./provider-details"
import HintWithIcon from "./hint"

interface ProviderTableProps {
  providers: Provider[]
  loading: boolean
  onSort: (field: string) => void
  sortField: string | null
  sortDirection: string
}

export default function ProviderTable({ providers, loading, onSort, sortField, sortDirection }: ProviderTableProps) {
  const safeProviders = Array.isArray(providers) ? providers : []

  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  if (loading && safeProviders.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Loading...</p>
      </div>
    )
  }

  if (safeProviders.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Providers not found</p>
      </div>
    )
  }

  const toggleRowExpand = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const getSortIcon = (field: string) => {
    const iconType = getSortIconType(field, sortField, sortDirection)
    if (!iconType) return null
    return iconType === "up"
      ? <ArrowUp className="h-4 w-4 ml-1 text-blue-500" />
      : <ArrowDown className="h-4 w-4 ml-1 text-blue-500" />
  }

  return (
    <div>
      <table className="ton-table">
        <thead>
          <tr>
            <th onClick={() => onSort("pubkey")}>
              <div className="flex items-center">
                Public Key
                {getSortIcon("pubkey")}
              </div>
            </th>
            <th onClick={() => onSort("uptime")}>
              <div className="flex items-center">
                Uptime
                {getSortIcon("uptime")}
              </div>
            </th>
            <th onClick={() => onSort("workingTime")}>
              <div className="flex items-center">
                Working Time
                {getSortIcon("workingTime")}
              </div>
            </th>
            <th onClick={() => onSort("rating")}>
              <div className="flex items-center">
                Rating
                {getSortIcon("rating")}
              </div>
            </th>
            <th onClick={() => onSort("price")}>
              <div className="flex items-center">
                Price
                <HintWithIcon text="per 200 GB per 30 days" maxWidth={18}/>
                {getSortIcon("price")}
              </div>
            </th>
            <th className="w-10"></th>
          </tr>
        </thead>
        <tbody>
          {safeProviders.map((provider) => (
            <>
              <tr key={provider.pubkey}>
                <td>
                  <div className="flex items-center">
                    <span className="font-mono text-sm">{shortenString(provider.pubkey, 15)}</span>
                    <button
                      onClick={() => copyToClipboard(provider.pubkey, setCopiedKey)}
                      className={`ml-2 transition-colors duration-200
                        ${copiedKey === provider.pubkey
                          ? "text-gray-100 font-extrabold drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]"
                          : "text-gray-700 hover:text-gray-400"
                        }`}
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </td>
                <td>{(provider.uptime).toFixed(2)} %</td>
                <td>{printTime(provider.working_time)}</td>
                <td>
                  <div className="flex items-center">
                    <span className="">{provider.rating.toFixed(2)}</span>
                    <Star className="h-4 w-4 ml-2 text-yellow-400" />
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    {/* per gb per day */}
                    {(provider.price / 1_000_000_000).toFixed(2)} TON
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => toggleRowExpand(provider.pubkey)}
                    className="p-1 rounded-full hover:bg-gray-100"
                    aria-label={expandedRows[provider.pubkey] ? "Collapse details" : "Expand details"}
                  >
                    {expandedRows[provider.pubkey] ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </td>
              </tr>
              
              {expandedRows[provider.pubkey] && (
                <ProviderDetails provider={provider} key={`${provider.pubkey}-details`}/>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  )
}
