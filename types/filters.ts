export interface FiltersData {
  rating_gt: number | null, // float 
  rating_lt: number | null, // float
  reg_time_days_gt: number | null, // int
  reg_time_days_lt: number | null, // int
  uptime_gt_percent: number | null, // float
  uptime_lt_percent: number | null, // float
  working_time_gt_sec: number | null, // int
  working_time_lt_sec: number | null, // int
  price_gt: number | null, // float
  price_lt: number | null, // float
  min_span_gt: number | null, // int
  min_span_lt: number | null, // int
  max_span_gt: number | null, // int
  max_span_lt: number | null, // int
  max_bag_size_bytes_gt: number | null, // int
  max_bag_size_bytes_lt: number | null, // int
  is_send_telemetry: boolean | null,
  total_provider_space_gt: number | null, // float
  total_provider_space_lt: number | null, // float
  used_provider_space_gt: number | null, // float
  used_provider_space_lt: number | null, // float
  storage_git_hash: string | null,
  provider_git_hash: string | null,
  cpu_number_gt: number | null, // int
  cpu_number_lt: number | null, // int
  cpu_name: string | null,
  cpu_is_virtual: boolean | null,
  total_ram_gt: number | null, // float
  total_ram_lt: number | null, // float
  used_ram_gt: number | null, // float
  used_ram_lt: number | null, // float
  benchmark_disk_read_speed_gt: number | null, // float
  benchmark_disk_read_speed_lt: number | null, // float
  benchmark_disk_write_speed_gt: number | null, // float
  benchmark_disk_write_speed_lt: number | null, // float
  benchmark_rocks_ops_gt: number | null, // float
  benchmark_rocks_ops_lt: number | null, // float
  speedtest_download_speed_gt: number | null, // float
  speedtest_download_speed_lt: number | null, // float
  speedtest_upload_speed_gt: number | null, // float
  speedtest_upload_speed_lt: number | null, // float
  speedtest_ping_gt: number | null, // float
  speedtest_ping_lt: number | null, // float
  country: string | null,
  isp: string | null,
}