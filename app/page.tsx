"use client"

import { useEffect, useState } from "react"
import ProviderTable from "@/components/provider-table"
import type { Provider } from "@/types/provider"
import { fetchProviders } from "@/lib/api"

export default function Home() {
  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(true)
  const [sortField, setSortField] = useState<string | null>("providerRating")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    loadProviders()
  }, [])

  const loadProviders = async () => {
    setLoading(true)
    try {
      const data = await fetchProviders(0, 100, sortField, sortDirection)
      setProviders(data)
    } catch (error) {
      console.error("Failed to fetch providers:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  return (
    <div className="space-y-12 py-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold">TON Storage Providers</h1>
        <p className="text-xl text-gray-600">Find and compare storage providers on the TON network</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <ProviderTable
          providers={providers}
          loading={loading}
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
        />
{/* 
        {providers.length > 0 && (
          <div className="p-4 flex justify-center">
            <button
              onClick={loadProviders}
              className="px-6 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition-colors"
              disabled={loading}
            >
              {loading ? "Loading..." : "Refresh Data"}
            </button>
          </div>
        )} */}
      </div>
    </div>
  )
}
