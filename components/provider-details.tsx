import { copyToClipboard, printSpace, printTime, printUnixTime, shortenString, timeDiff } from "@/lib/utils";
import type { Provider } from "@/types/provider"
import { Cpu, Globe, Info, Server, BarChart2, Copy } from "lucide-react"
import { useMemo, useState } from "react";

type ProviderDetailsProps = {
    provider: Provider
}

export function ProviderDetails({ provider }: ProviderDetailsProps) {
    const t = provider.telemetry || {};
    const updatedSecAgo = useMemo(() => {
        return timeDiff(provider.telemetry?.updated_at || 0)
    }, [provider.telemetry?.updated_at]);

    const renderField = (label: string, value: any, unit?: string, link?: string, copy?: string, isInteger?: boolean) => {
      const [copiedKey, setCopiedKey] = useState<string | null>(null);
      
      const isEmpty = value === null || value === undefined || value === '' || Number.isNaN(value) || value === 0;

      const isNumber = typeof value === 'number' && !isNaN(value);
      if (isNumber) {
        if (isInteger) {
          value = Math.round(value);
        } else {
          value = parseFloat(value.toString()).toFixed(2);
        }
      }

      const text = !isEmpty ? `${value} ${(unit || '')}` : '—';
      const shorten = shortenString(text, 22);
      const title = shorten.length < text.length ? text : undefined;

      return (
        <div className="flex items-center mb-2">
          <span className="font-semibold w-56 inline-block">{label}</span>
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              <span className="truncate" title={title}>{shorten}</span>
            </a>
          ) : (
            <span className="truncate" title={title}>{shorten}</span>
          )}
          {/* <span className="ml-2 truncate" title={title}>{shorten}</span> */}
          {copy && (
            <button
              onClick={() => copyToClipboard(copy, setCopiedKey)}
              className={`ml-2 transition-colors duration-200
              ${copiedKey === copy
                  ? "text-gray-100 font-extrabold drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]"
                  : "text-gray-700 hover:text-gray-400"
              }`}
            ><Copy className="h-4 w-4" /></button>
          )}
        </div>
      );
    };

    return (
        <tr>
            <>
                <td colSpan={7} className="bg-gray-50 p-0">
                    
                {/* Status Panel */}
                <div className="my-4 p-5 rounded-lg border-2 bg-white">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-700">Status</span>
                        <div className="flex items-center gap-2">
                            {provider.status === null && (
                                <>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-gray-500 font-medium">No Data</span>
                                </>
                            )}
                            {provider.status === 0 && (
                                <>
                                    <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_6px_rgba(34,197,94,0.6)]"></div>
                                    <span className="text-sm text-green-600 font-medium">Verified</span>
                                </>
                            )}
                            {provider.status === 2 && (
                                <>
                                    <div className="w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_6px_rgba(249,115,22,0.6)]"></div>
                                    <span className="text-sm text-orange-600 font-medium">Invalid Data</span>
                                </>
                            )}
                            {provider.status === 3 && (
                                <>
                                    <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_6px_rgba(239,68,68,0.6)]"></div>
                                    <span className="text-sm text-red-600 font-medium">Not Actually Store</span>
                                </>
                            )}
                            {provider.status === 500 && (
                                <>
                                    <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                                    <span className="text-sm text-gray-700 font-medium">Not Accessible</span>
                                </>
                            )}
                        </div>
                    </div>
                    
                    {/* Status Description */}
                    <div className="mt-2 text-xs text-gray-500">
                        {provider.status === null && "Provider is not storing any data or we just don't check it yet"}
                        {provider.status === 0 && "Provider is verified and passing all checks"}
                        {provider.status === 2 && "Provider contains invalid or corrupted data"}
                        {provider.status === 3 && "Provider has some storage contracts, but not actually storing them"}
                        {provider.status === 500 && "Provider was not accessible when we tried to check it"}
                    </div>
                </div>

                {
                    provider.is_send_telemetry && updatedSecAgo != 0 && updatedSecAgo > 60 * 10 &&
                    <div className="flex justify-center">
                        <p className="text-sm text-red-500">Last telemetry update was more than <b>{printTime(updatedSecAgo, true)}</b> ago</p>
                    </div>
                }

                <div className="p-4 text-sm grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Provider */}
                    <div>
                        <div className="flex items-center mb-2 text-gray-500 font-bold"><Info className="w-4 h-4 mr-2" />Provider</div>
                        {renderField('Address', provider.address, '', `https://tonscan.org/address/${provider.address}`, provider.address, true)}
                        {renderField('Max Span', printTime(provider.max_span))}
                        {renderField('Min Span', printTime(provider.min_span))}
                        {renderField('Max Bag Size', printSpace(provider.max_bag_size_bytes))}
                        {renderField('Registration Time', printUnixTime(provider.reg_time))}
                    </div>

                    {/* Hardware */}
                    {
                        provider.is_send_telemetry &&
                        <div>
                            <div className="flex items-center mb-2 text-gray-500 font-bold"><Cpu className="w-4 h-4 mr-2" />Hardware</div>
                            {renderField('CPU Name', t.cpu_name)}
                            {renderField('CPU Number', t.cpu_number)}
                            {renderField('CPU is Virtual', t.cpu_is_virtual === null || t.cpu_is_virtual === undefined ? null : t.cpu_is_virtual ? 'Yes' : 'No')}
                            {renderField('RAM', `${t.usage_ram?.toFixed(2)} of ${t.total_ram?.toFixed(2)}`, ` Gb`)}
                            {renderField('Total Provider Space', `${t.used_provider_space?.toFixed(2)} of ${t.total_provider_space?.toFixed(2)}`, ' Gb')}
                        </div>
                    }

                    {/* Benchmarks */}
                    {
                        provider.is_send_telemetry &&
                        <div>
                            <div className="flex items-center mb-2 text-gray-500 font-bold"><BarChart2 className="w-4 h-4 mr-2" />Benchmarks</div>
                            {renderField('Disk Read Speed', t.qd64_disk_read_speed, '')}
                            {renderField('Disk Write Speed', t.qd64_disk_write_speed, '')}
                        </div>
                    }

                    {/* Network */}
                    {
                        provider.is_send_telemetry &&
                        <div>
                            <div className="flex items-center mb-2 text-gray-500 font-bold"><Globe className="w-4 h-4 mr-2" />Network</div>
                            {renderField('Speedtest Download', t.speedtest_download ? t.speedtest_download / 1000000 : 0, ' Mbps')}
                            {renderField('Speedtest Upload', t.speedtest_upload ? t.speedtest_upload / 1000000 : 0, ' Mbps')}
                            {renderField('Speedtest Ping', t.speedtest_ping, '')}
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
            </>
        </tr>
    )
}
