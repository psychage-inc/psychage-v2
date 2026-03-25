import React from 'react';
import { Phone, MessageSquare, ExternalLink } from 'lucide-react';
import { CrisisResource } from '../../lib/navigator/types';
import { Card } from '../ui/Card';

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
        <Card variant="default" className="relative overflow-hidden border-l-4 border-l-crisis-red bg-surface">
            <div className="absolute inset-0 bg-crisis-red/5 z-0 pointer-events-none"></div>

            <div className="ml-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10 py-1">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-display font-semibold text-lg text-text-primary">
                            {resource.name}
                        </h3>
                        {resource.hours.toLowerCase().includes('24/7') && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-crisis-red/20 text-red-300 border border-crisis-red/30 backdrop-blur-sm">
                                24/7
                            </span>
                        )}
                    </div>

                    <p className="text-sm text-text-secondary">
                        {resource.description}
                    </p>

                    <p className="font-mono font-medium text-base sm:text-lg text-text-primary pt-1 break-all">
                        {resource.phone || resource.text_instruction || resource.url || ''}
                    </p>
                </div>

                <a
                    href={getActionHref()}
                    target={resource.type === 'directory' ? "_blank" : undefined}
                    rel={resource.type === 'directory' ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center justify-center gap-2 bg-crisis-red text-white px-5 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crisis-red focus-visible:ring-offset-2 focus-visible:ring-offset-background w-full sm:w-auto flex-shrink-0"
                >
                    <span className="flex items-center gap-2">
                        {getIcon()}
                        <span>{getActionText()}</span>
                    </span>
                </a>
            </div>
        </Card>
    );
};
