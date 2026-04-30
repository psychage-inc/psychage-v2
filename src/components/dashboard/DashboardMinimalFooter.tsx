import React from 'react';
import { Link } from 'react-router-dom';

const DashboardMinimalFooter: React.FC = () => (
    <footer className="text-center py-6 text-xs text-gray-400 dark:text-neutral-500">
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
            <Link to="/legal/privacy" className="hover:text-gray-600 dark:hover:text-neutral-300 transition-colors">Privacy</Link>
            <span aria-hidden="true">·</span>
            <Link to="/legal/terms" className="hover:text-gray-600 dark:hover:text-neutral-300 transition-colors">Terms</Link>
            <span aria-hidden="true">·</span>
            <Link to="/crisis" className="hover:text-gray-600 dark:hover:text-neutral-300 transition-colors">Crisis Support</Link>
            <span aria-hidden="true">·</span>
            <span>&copy; {new Date().getFullYear()} Psychage, Inc.</span>
        </div>
    </footer>
);

export default DashboardMinimalFooter;
