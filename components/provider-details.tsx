import type { Provider } from "@/types/provider"
import { Cpu, Globe, Info, Server, BarChart2 } from "lucide-react"

export function ProviderDetails({ provider }: { provider: Provider }) {
    const t = provider.telemetry || {};
    
    const renderField = (label: string, value: any, unit?: string) => {
      const isEmpty = value === null || value === undefined || value === '' || Number.isNaN(value) || value === 0;
      
      return (
        <div className="flex items-center mb-2">
          <span className="font-semibold w-56 inline-block">{label}:</span>
          <span className="ml-2">{!isEmpty ? value + (unit || '') : <span className="text-gray-400">—</span>}</span>
        </div>
      );
    };

    return (
        <tr key={`${provider.pubkey}-details`}>
            <td colSpan={7} className="bg-gray-50 p-0">
            <div className="p-4 text-sm grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Provider */}
                <div>
                    <div className="flex items-center mb-2 text-gray-500 font-bold"><Info className="w-4 h-4 mr-2" />Provider</div>
                    {renderField('Uptime', (provider.uptime * 100).toFixed(2), '%')}
                    {renderField('Max Span', provider.max_span, ' sec.')}
                    {renderField('Min Span', provider.min_span, ' sec.')}
                    {renderField('Max Bag Size', provider.max_bag_size_bytes, ' bytes')}
                    {renderField('Registration Time', provider.reg_time)}
                    {renderField('Send Telemetry', provider.is_send_telemetry ? 'Yes' : 'No')}
                </div>

                {/* Hardware */}
                {
                    provider.is_send_telemetry &&
                    <div>
                        <div className="flex items-center mb-2 text-gray-500 font-bold"><Cpu className="w-4 h-4 mr-2" />Hardware</div>
                        {renderField('CPU Name', t.cpu_name)}
                        {renderField('CPU Number', t.cpu_number)}
                        {renderField('CPU is Virtual', t.cpu_is_virtual === null || t.cpu_is_virtual === undefined ? null : t.cpu_is_virtual ? 'Yes' : 'No')}
                        {renderField('Total RAM', t.total_ram, ' %')}
                        {renderField('Free RAM', t.free_ram, ' %')}
                        {renderField('Total Provider Space', t.total_provider_space, ' Gb')}
                        {renderField('Free Provider Space', t.free_provider_space, ' Gb')}
                    </div>
                }

                {/* Benchmarks */}
                {
                    provider.is_send_telemetry &&
                    <div>
                        <div className="flex items-center mb-2 text-gray-500 font-bold"><BarChart2 className="w-4 h-4 mr-2" />Benchmarks</div>
                        {renderField('Disk Read Speed', t.benchmark_disk_read_speed, ' MB/s')}
                        {renderField('Disk Write Speed', t.benchmark_disk_write_speed, ' MB/s')}
                        {renderField('RocksDB Ops', t.benchmark_rocks_ops)}
                    </div>
                }

                {/* Network */}
                {
                    provider.is_send_telemetry &&
                    <div>
                        <div className="flex items-center mb-2 text-gray-500 font-bold"><Globe className="w-4 h-4 mr-2" />Network</div>
                        {renderField('Speedtest Download', t.speedtest_download_speed, ' Mbps')}
                        {renderField('Speedtest Upload', t.speedtest_upload_speed, ' Mbps')}
                        {renderField('Speedtest Ping', t.speedtest_ping, ' ms')}
                        {renderField('Country', t.country)}
                        {renderField('ISP', t.isp)}
                    </div>
                }

                {/* Software */}
                {
                    provider.is_send_telemetry &&
                    <div>
                        <div className="flex items-center mb-2 text-gray-500 font-bold"><Server className="w-4 h-4 mr-2" />Software</div>
                        {renderField('Storage Git Hash', t.storage_git_hash)}
                        {renderField('Provider Git Hash', t.provider_git_hash)}
                    </div>
                }
            </div>
            </td>
        </tr>
    )
}
