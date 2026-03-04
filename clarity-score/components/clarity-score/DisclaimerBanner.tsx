import { AlertCircle } from 'lucide-react';

export default function DisclaimerBanner() {
    return (
        <div className="mt-12 flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 p-4 text-xs text-text-muted">
            <AlertCircle size={16} className="mt-0.5 shrink-0 opacity-50" />
            <p>
                <strong>Clinical Disclaimer:</strong> The Clarity Score uses validated instruments (PHQ-4, WHO-5, UCLA-3, PSS-4, WSAS) to provide a snapshot of your mental wellbeing. These results are for educational purposes only and do not constitute a clinical diagnosis. If you are experiencing significant distress, consult a healthcare professional. If you are in crisis, please call or text 988.
            </p>
        </div>
    );
}
