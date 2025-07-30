
import { copyToClipboard, shortenString } from "@/lib/utils";
import { Copy } from "lucide-react";
import { useState } from "react";

export function RenderField(label: string, value: any, unit?: string, link?: string, copy?: string, isInteger?: boolean) {
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
    const shorten = shortenString(text, 20);
    const title = shorten != text ? text : undefined;

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