"use client"

import React, { useState } from "react"
import type { Provider } from "@/types/provider"
import {
  Star,
  Copy,
  ArrowUp,
  ArrowDown,
  InfoIcon,
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

  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
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

  const getSortIcon = (field: string) => {
    const iconType = getSortIconType(field, sortField, sortDirection)
    if (!iconType) return null
    return iconType === "up"
      ? <ArrowUp className="h-4 w-4 ml-1 text-blue-500" />
      : <ArrowDown className="h-4 w-4 ml-1 text-blue-500" />
  }

  return (
    <div>
      
      {/* Details modal */}
      <div className="fixed inset-0 z-50 overflow-hidden" hidden={selectedProvider === null}>
        <div className="absolute inset-0 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative bg-white border shadow-2xl rounded-xl p-8 mt-4 mb-4 mx-auto max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button
                className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200"
                onClick={() => setSelectedProvider(null)}
            >
                <span className="text-gray-600 text-lg font-medium">✕</span>
            </button>

            {selectedProvider && (
              <div>
                <p className="text-md text-gray-700 mb-2">
                  <span className="text-gray-900 font-semibold">Provider details:</span> {shortenString(selectedProvider.pubkey, 35)}
                  <button
                    onClick={() => copyToClipboard(selectedProvider.pubkey, setCopiedKey)}
                    className={`ml-2 transition-colors duration-200
                      ${copiedKey === selectedProvider.pubkey
                        ? "text-gray-100 font-extrabold drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]"
                        : "text-gray-700 hover:text-gray-400"
                      }`}
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </p>
                {/* <div className="mx-auto"> */}
                  <div className="flex justify-center">
                    <ProviderDetails provider={selectedProvider} key={`${selectedProvider.pubkey}-details`}/>
                  </div>
                {/* </div> */}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Providers table */}
      <table className="ton-table overscroll-x-auto">
        <thead>
          <tr>
            <th onClick={() => onSort("pubkey")}>
              <div className="flex items-center">
                Public Key
                {getSortIcon("pubkey")}
              </div>
            </th>
            <th onClick={() => {}}>
              <div className="flex items-center">
                Status
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
          {safeProviders.map((provider, index) => (
            <React.Fragment key={provider.pubkey}>
              <tr key={provider.pubkey} className={index % 2 ? "" : "bg-gray-50"}>
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
                <td><StatusCell status={provider.status} /></td>
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
                    {(provider.price / 1_000_000_000).toFixed(2)} TON
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => setSelectedProvider(provider)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <InfoIcon className="h-5 w-5 text-gray-500" />
                  </button>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatusCell({ status }: { status: number | null }) {
  const getStatusInfo = () => {
    switch (status) {
      case null:
        return { color: 'bg-gray-400', text: 'No Data', textColor: 'text-gray-500' }
      case 0:
        return { color: 'bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.4)]', text: 'Verified', textColor: 'text-green-600' }
      case 2:
        return { color: 'bg-orange-500 shadow-[0_0_4px_rgba(249,115,22,0.4)]', text: 'Invalid', textColor: 'text-orange-600' }
      case 3:
        return { color: 'bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.4)]', text: 'Not Store', textColor: 'text-red-600' }
      case 500:
        return { color: 'bg-gray-700', text: 'Not Access', textColor: 'text-gray-700' }
      default:
        return { color: 'bg-gray-400', text: 'Unknown', textColor: 'text-gray-500' }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${statusInfo.color} ${status === null ? 'animate-pulse' : ''}`}></div>
      <span className={`text-xs font-medium ${statusInfo.textColor}`}>
        {statusInfo.text}
      </span>
    </div>
  )
}
