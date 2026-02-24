import React from 'react';
import { Phone, MessageSquare, ExternalLink, ShieldAlert } from 'lucide-react';
import { CrisisResource } from '../../lib/navigator/types';
import { cn } from '../../lib/utils';
import InteractiveCard from '../ui/InteractiveCard';

interface CrisisResourceCardProps {
    resource: CrisisResource;
}

export const CrisisResourceCard: React.FC<CrisisResourceCardProps> = ({ resource }) => {
    const getIcon = () => {
        switch (resource.type) {
            case 'hotline':
                return <Phone className="w-5 h-5" />;
            case 'text':
                return <MessageSquare className="w-5 h-5" />;
            case 'directory':
            default:
                return <ExternalLink className="w-5 h-5" />;
        }
    };

    const getActionHref = () => {
        switch (resource.type) {
            case 'hotline':
                return resource.phone ? `tel:${resource.phone.replace(/[^\d+]/g, '')}` : '#';
            case 'text':
                return resource.text_instruction ? `sms:${resource.text_instruction}` : '#';
            case 'directory':
                return resource.url || '#';
            default:
                return '#';
        }
    };

    const getActionText = () => {
        switch (resource.type) {
            case 'hotline':
                return 'Call Now';
            case 'text':
                return 'Text Now';
            case 'directory':
                return 'Visit Website';
            default:
                return 'Contact';
        }
    };

    return (
        <InteractiveCard className="bg-white/5 rounded-xl p-5 border-white/10 shadow-lg relative overflow-hidden group backdrop-blur-md">
            {/* Ambient red glow for crisis card */}
            <div className="absolute inset-0 bg-gradient-to-r from-crisis-red/10 to-transparent opacity-50 z-0 pointer-events-none rounded-xl"></div>
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-crisis-red z-10 shadow-[0_0_10px_rgba(239,68,68,0.8)] pointer-events-none"></div>

            <div className="ml-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-serif font-semibold text-lg text-white">
                            {resource.name}
                        </h3>
                        {resource.hours.toLowerCase().includes('24/7') && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-crisis-red/20 text-red-300 border border-crisis-red/30 backdrop-blur-sm">
                                24/7
                            </span>
                        )}
                    </div>

                    <p className="text-sm text-charcoal-200">
                        {resource.description}
                    </p>

                    <p className="font-mono font-medium text-lg text-white pt-1">
                        {resource.phone || resource.text_instruction || resource.url || ''}
                    </p>
                </div>

                <a
                    href={getActionHref()}
                    target={resource.type === 'directory' ? "_blank" : undefined}
                    rel={resource.type === 'directory' ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center justify-center gap-2 bg-crisis-red/90 text-white px-5 py-3 rounded-lg font-medium shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] border border-red-400/30 hover:bg-crisis-red transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900 w-full sm:w-auto flex-shrink-0 overflow-hidden relative group/btn"
                >
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                    <span className="relative z-10 flex items-center gap-2">
                        {getIcon()}
                        <span>{getActionText()}</span>
                    </span>
                </a>
            </div>
        </InteractiveCard>
    );
};
