import { useState, useEffect } from "react"
import { BarChart2, Cpu, Globe, Info, Server, SlidersHorizontal } from 'lucide-react';
import { FiltersData } from "@/types/filters";
import { TriStateField } from "./tri-state-field";
import { NumberField } from "./number-field";
import { FieldGroup } from "./group";

const getResetFiltersMap = () => ({
  is_send_telemetry: null,
  cpu_is_virtual: null,
} as FiltersData)

export type FiltersProps = {
  onApply: (filters: FiltersData) => void
  onReset: () => void
}

export function Filters({ onApply, onReset }: FiltersProps) {
  const [filters, setFilters] = useState(getResetFiltersMap())

  const handleTriStateChange = (name: string, value: boolean | null) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onApply(filters)
  }

  const handleReset = () => {
    setFilters(getResetFiltersMap())
    onReset()
  }

  const TextField = ({ label, name }: { label: string, name: string }) => {
    const [localValue, setLocalValue] = useState(String(filters[name as keyof typeof filters] ?? ''))
    useEffect(() => {
      setLocalValue(String(filters[name as keyof typeof filters] ?? ''))
    }, [filters[name as keyof typeof filters]])
    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-700" htmlFor={name}>{label}</label>
        <input type="text" name={name} id={name} value={localValue} onChange={e => setLocalValue(e.target.value)} onBlur={e => setFilters(f => ({ ...f, [name]: e.target.value }))} className="border rounded px-2 py-1 focus:ring-2 focus:ring-blue-200" />
      </div>
    )
  }
  
  return (
      <>
          <div>
            <form className="bg-gray-50 rounded-xl p-6 mt-2 mb-6 max-w-6xl mx-auto filters-form" onSubmit={handleSubmit}>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-blue-500" />
                  Filters
                </h2>
              </div>
              <div className="min-w-[400px] max-w-[400px]">
                <FieldGroup 
                  icon={<Info className="w-4 h-4 mr-2" />} 
                  title="Provider"
                  isExpandedByDefault={true}>
                  <NumberField
                    label="Rating"
                    nameFrom="rating_gt"
                    nameTo="rating_lt"
                    min={0}
                    max={5}
                    step={0.01}
                    filters={filters}
                    setFilters={setFilters as React.Dispatch<React.SetStateAction<Record<string, any>>>}
                  />
                  <NumberField
                    label="Registration Time (days)"
                    nameFrom="reg_time_days_gt"
                    nameTo="reg_time_days_lt"
                    min={1}
                    max={365 * 3}
                    step={1}
                    filters={filters}
                    setFilters={setFilters}
                  />
                  <NumberField
                    label="Uptime (%)"
                    nameFrom="uptime_gt_percent"
                    nameTo="uptime_lt_percent"
                    min={0}
                    max={100}
                    step={0.1}
                    filters={filters}
                    setFilters={setFilters}
                  />
                  <NumberField
                    label="Price"
                    nameFrom="price_gt"
                    nameTo="price_lt"
                    min={0.1}
                    max={100}
                    step={0.1}
                    filters={filters}
                    setFilters={setFilters}
                  />
                  <NumberField
                    label="Min Span (sec.)"
                    nameFrom="min_span_gt"
                    nameTo="min_span_lt"
                    min={1}
                    max={3600 * 24 * 30} // 30 days
                    step={3600} // 1 hour
                    filters={filters}
                    setFilters={setFilters}
                  />
                  <NumberField
                    label="Max Span (sec.)"
                    nameFrom="max_span_gt"
                    nameTo="max_span_lt"
                    min={1}
                    max={3600 * 24 * 30} // 30 days
                    step={3600} // 1 hour
                    filters={filters}
                    setFilters={setFilters}
                  />
                  {/* TODO: impl */}
                  {/* <NumberField label="Max Bag Size (bytes)" nameFrom="max_bag_size_bytes_gt" nameTo="max_bag_size_bytes_lt" /> */}
                </FieldGroup>
                <FieldGroup 
                  icon={<Cpu className="w-4 h-4 mr-2" />}
                  title="Hardware"
                  isExpandedByDefault={false}>
                  <NumberField
                    label="Total Provider Space (Gb)"
                    nameFrom="total_provider_space_gt"
                    nameTo="total_provider_space_lt"
                    min={10}
                    max={30000}
                    step={10}
                    filters={filters}
                    setFilters={setFilters}
                  />
                  <NumberField
                    label="Used Provider Space (Gb)"
                    nameFrom="used_provider_space_gt"
                    nameTo="used_provider_space_lt"
                    min={0}
                    max={30000}
                    step={10}
                    filters={filters}
                    setFilters={setFilters}
                  />
                  <NumberField
                    label="CPU Number"
                    nameFrom="cpu_number_gt"
                    nameTo="cpu_number_lt"
                    min={1}
                    max={128}
                    step={1}
                    filters={filters}
                    setFilters={setFilters}
                  />
                  <TextField label="CPU Name (contains):" name="cpu_name" />
                  <TriStateField
                    label="CPU is Virtual:"
                    name="cpu_is_virtual"
                    value={filters.cpu_is_virtual}
                    onChange={handleTriStateChange}
                  />
                  <NumberField
                    label="Total RAM Gb"
                    nameFrom="total_ram_gt"
                    nameTo="total_ram_lt"
                    min={0}
                    max={512}
                    step={1}
                    filters={filters}
                    setFilters={setFilters}
                  />
                  <NumberField
                    label="Used RAM %"
                    nameFrom="used_ram_gt"
                    nameTo="used_ram_lt"
                    min={0}
                    max={100}
                    step={1}
                    filters={filters}
                    setFilters={setFilters}
                  />
                </FieldGroup>
                <FieldGroup
                  icon={<BarChart2 className="w-4 h-4 mr-2" />}
                  title="Benchmarks"
                  isExpandedByDefault={false}>
                  <NumberField
                    label="Disk Read Speed"
                    nameFrom="benchmark_disk_read_speed_gt"
                    nameTo="benchmark_disk_read_speed_lt"
                    min={0}
                    max={10000} // ???
                    step={1}
                    filters={filters}
                    setFilters={setFilters}
                  />
                  <NumberField
                    label="Disk Write Speed"
                    nameFrom="benchmark_disk_write_speed_gt"
                    nameTo="benchmark_disk_write_speed_lt"
                    min={0}
                    max={10000} // ???
                    step={1}
                    filters={filters}
                    setFilters={setFilters}
                  />
                  <NumberField
                    label="Rocks Ops"
                    nameFrom="benchmark_rocks_ops_gt"
                    nameTo="benchmark_rocks_ops_lt"
                    min={0}
                    max={10000} // ???
                    step={1}
                    filters={filters}
                    setFilters={setFilters}
                  />
                </FieldGroup>
                <FieldGroup 
                  icon={<Globe className="w-4 h-4 mr-2" />}
                  title="Network"
                  isExpandedByDefault={false}>
                  <NumberField
                    label="Download Speed"
                    nameFrom="speedtest_download_speed_gt"
                    nameTo="speedtest_download_speed_lt"
                    min={0}
                    max={10000} // ???
                    step={1}
                    filters={filters}
                    setFilters={setFilters}
                  />
                  <NumberField
                    label="Upload Speed"
                    nameFrom="speedtest_upload_speed_gt"
                    nameTo="speedtest_upload_speed_lt"
                    min={0}
                    max={10000} // ???
                    step={1}
                    filters={filters}
                    setFilters={setFilters}
                  />
                  <NumberField
                    label="Ping"
                    nameFrom="speedtest_ping_gt"
                    nameTo="speedtest_ping_lt"
                    min={0}
                    max={600}
                    step={10}
                    filters={filters}
                    setFilters={setFilters}
                  />
                  <TextField label="Country (contains):" name="country" />
                  <TextField label="ISP (contains):" name="isp" />
                </FieldGroup>
                <FieldGroup
                  icon={<Server className="w-4 h-4 mr-2" />}
                  title="Software"
                  isExpandedByDefault={false}>
                  <TextField label="Storage Git Hash" name="storage_git_hash" />
                  <TextField label="Provider Git Hash" name="provider_git_hash" />
                  <TriStateField
                    label="Is Send Telemetry:"
                    name="is_send_telemetry"
                    value={filters.is_send_telemetry}
                    onChange={handleTriStateChange}
                  />
                </FieldGroup>
              </div>
              <div className="flex gap-4 justify-end mt-4 sticky bottom-0 pt-4 z-10">
                <button type="button" onClick={handleReset} className="px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100">Reset</button>
                <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">Apply Filters</button>
              </div>
            </form>
          </div>
      </>
  )
}
