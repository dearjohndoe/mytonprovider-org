
import { ChevronDown, ChevronUp } from 'lucide-react';
import React from 'react';

export interface FieldGroupProps {
    title: string;
    children: React.ReactNode;
    icon: React.ReactNode;
    isExpandedByDefault: boolean;
}

export function FieldGroup({ title, children, icon, isExpandedByDefault }: FieldGroupProps) {
    const [isExpanded, setIsExpanded] = React.useState(isExpandedByDefault);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <fieldset className={`p-2 mb-4`}>
            <div className='flex justify-between mb-2 mr-2'>
                <legend className="flex items-center text-sm mb-2 text-gray-700 font-bold">
                    {icon}
                    {title}
                </legend>
                <button
                    type="button"
                    className="text-xs text-gray-500 hover:text-gray-700 mb-2"
                    onClick={toggleExpand}
                >
                    {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                </button>
            </div>

            {isExpanded && (
                <div className="p-2 pr-4 grid grid-cols-1 md:grid-cols-1 gap-3 mb-8">{children}</div>
            )}
        </fieldset>
    );
}
