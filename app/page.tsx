"use client"

import { useEffect, useState, useCallback } from "react"
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
  const [hasMore, setHasMore] = useState(false)
  const [currentOffset, setCurrentOffset] = useState(0)

  const pageSize = 10

  useEffect(() => {
    // Load initial data on component mount
    loadProviders(defaultField, defaultDirection, {} as FiltersData, 0, false)
  }, [])

  const loadProviders = useCallback(async (
    sortField: string, 
    sortDirection: string, 
    actualFilters: FiltersData, 
    offset: number = 0, 
    append: boolean = false
  ) => {
    setError(null)
    setLoading(true)
    
    // Reset pagination state for new queries
    if (!append) {
      setCurrentOffset(0)
    }
    
    try {
      const data = await fetchProviders(offset, pageSize, actualFilters, sortField, sortDirection)
      if (data.errorMsg) {
        setError(data.errorMsg)
      } else {
        const newProviders = data.data || []
        if (append) {
          setProviders(prev => [...prev, ...newProviders])
        } else {
          setProviders(newProviders)
        }

        setHasMore(newProviders.length >= pageSize)
        setCurrentOffset(offset + pageSize)
      }
    } catch (error) {
      console.error("Failed to fetch providers:", error)
      setError("Failed to load providers. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [pageSize])

  const handleSort = useCallback((field: string) => {
    var direction = "desc"
    if (sortField === field) {
      direction = sortDirection === "asc" ? "desc" : "asc"
      setSortDirection(direction)
    } else {
      setSortField(field)
      setSortDirection(direction)
    }

    loadProviders(field, direction, selectedFilters, 0, false)
  }, [sortField, sortDirection, selectedFilters, loadProviders])

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      loadProviders(sortField, sortDirection, selectedFilters, currentOffset, true)
    }
  }, [hasMore, loading, sortField, sortDirection, selectedFilters, currentOffset, loadProviders])

  const handleFilterApply = useCallback((filters: FiltersData) => {
    setSelectedFilters(filters)
    loadProviders(sortField, sortDirection, filters, 0, false)
  }, [sortField, sortDirection, loadProviders])

  const handleFilterReset = useCallback(() => {
    const emptyFilters = {} as FiltersData
    setSelectedFilters(emptyFilters)
    loadProviders(sortField, sortDirection, emptyFilters, 0, false)
  }, [sortField, sortDirection, loadProviders])

  const renderLoadMoreSection = useCallback(() => {
    if (loading && providers.length === 0) return null
    if (providers.length === 0) return null
    
    return (
      <div className="mt-6 text-center space-y-3">
        <div className="text-sm text-gray-600">
          Showing {providers.length} providers
        </div>
        {hasMore && (
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100"
          >
            {loading ? (
              <div className="flex">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Loading...
              </div>
            ) : (
              'Load More'
            )}
          </button>
        )}
      </div>
    )
  }, [loading, providers.length, hasMore, loadMore])

  const formBody = () => {
    return (
      <div>
      {
        isMobile ? (
          <div className="container mx-auto">
            <DynamicFilters
              onApply={handleFilterApply}
              onReset={handleFilterReset}
            />
            <div className="overflow-x-auto">
              <DynamicProviderTable
                providers={providers}
                loading={loading && providers.length === 0}
                onSort={handleSort}
                sortField={sortField}
                sortDirection={sortDirection}
              />
            </div>
            {renderLoadMoreSection()}
          </div>
        ) : (
          <div className="flex space-x-6 justify-center">
            <div className="flex-none w-[55%] space-y-6">
              <DynamicProviderTable
                providers={providers}
                loading={loading && providers.length === 0}
                onSort={handleSort}
                sortField={sortField}
                sortDirection={sortDirection}
              />
              {renderLoadMoreSection()}
            </div>
            <div>
              <DynamicFilters
                onApply={handleFilterApply}
                onReset={handleFilterReset}
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
