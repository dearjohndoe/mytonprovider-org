"use client"

import { useEffect, useState } from "react"
import dynamic from 'next/dynamic';
import type { Provider } from "@/types/provider"
import { fetchProviders } from "@/lib/api"
import { FiltersData } from "@/types/filters"
import { useIsMobile } from "@/hooks/useIsMobile"

const defaultField = "rating"
const defaultDirection = "desc"

const DynamicProviderTable = dynamic(() => import('@/components/provider-table').then(mod => mod.default), { ssr: false });
const DynamicFilters = dynamic(() => import('@/components/filters').then(mod => mod.Filters), { ssr: false });

export default function Home() {
  const isMobile = useIsMobile()
  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFilters, setSelectedFilters] = useState<FiltersData>({} as FiltersData)
  const [sortField, setSortField] = useState<string>(defaultField)
  const [sortDirection, setSortDirection] = useState<string>(defaultDirection)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProviders(sortField, sortDirection, {} as FiltersData)
  }, [])

  const loadProviders = async (sortField: string, sortDirection: string, actualFilters: FiltersData) => {
    setError(null)
    setLoading(true)
    try {
      const data = await fetchProviders(0, 100, actualFilters, sortField, sortDirection)
      if (data.errorMsg) {
        setError(data.errorMsg)
      } else {
        setProviders(data.data || [])
      }
    } catch (error) {
      console.error("Failed to fetch providers:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSort = (field: string) => {
    var direction = "desc"
    if (sortField === field) {
      direction = sortDirection === "asc" ? "desc" : "asc"
      setSortDirection(direction)
    } else {
      setSortField(field)
      setSortDirection(direction)
    }

    loadProviders(field, direction, selectedFilters)
  }

  const formBody = () => {
    return (
      <div>
      {
        isMobile ? (
          <div className="container mx-auto">
            <DynamicFilters
              onApply={(filters: FiltersData) => {
                setSelectedFilters(filters)
                loadProviders(sortField, sortDirection, filters)
              }}
              onReset={() => {
                setSelectedFilters({} as FiltersData)
                loadProviders(sortField, sortDirection, selectedFilters)
              }}
            />
            <div className="overflow-x-auto">
              <DynamicProviderTable
                providers={providers}
                loading={loading}
                onSort={handleSort}
                sortField={sortField}
                sortDirection={sortDirection}
              />
            </div>
          </div>
        ) : (
          <div className="flex space-x-6 justify-center">
            <div className="flex-none w-[55%]">
              <DynamicProviderTable
                providers={providers}
                loading={loading}
                onSort={handleSort}
                sortField={sortField}
                sortDirection={sortDirection}
              />
            </div>
            <div>
              <DynamicFilters
                onApply={(filters: FiltersData) => {
                  setSelectedFilters(filters)
                  loadProviders(sortField, sortDirection, filters)
                }}
                onReset={() => {
                  setSelectedFilters({} as FiltersData)
                  loadProviders(sortField, sortDirection, selectedFilters)
                }}
              />
            </div>
          </div>
        )
      }
      </div>
    );
  }

  return (
    <div className="space-y-12 min-w-80 py-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold">TON Storage Providers</h1>
        <p className="text-xl text-gray-600">Find and compare storage providers on the TON network</p>
      </div>

      <div className="bg-white rounded-lg overflow-hidden">
        {
        error ? (
          <p className="text-red-600 text-center py-4">{error}</p>
        ): (
          <div className="p-4">
            {formBody()}
          </div>
        )
        }
      </div>
    </div>
  )
}
