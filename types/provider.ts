export interface ApiResponse {
  errorMsg: string | null
  data: Provider[]
}

export interface Telemetry {
  storage_git_hash?: string | null
  provider_git_hash?: string | null
  total_provider_space?: number | null
  free_provider_space?: number | null
  cpu_name?: string | null
  cpu_number?: number | null
  cpu_is_virtual?: boolean | null
  total_ram?: number | null
  free_ram?: number | null
  benchmark_disk_read_speed?: number | null
  benchmark_disk_write_speed?: number | null
  benchmark_rocks_ops?: number | null
  speedtest_download_speed?: number | null
  speedtest_upload_speed?: number | null
  speedtest_ping?: number | null
  country?: string | null
  isp?: string | null
}

export interface Provider {
  pubkey: string
  uptime: number
  working_time: number
  rating: number
  max_span: number
  price: number
  min_span: number
  max_bag_size_bytes: number
  reg_time: number
  is_send_telemetry: boolean
  telemetry: Telemetry
}
