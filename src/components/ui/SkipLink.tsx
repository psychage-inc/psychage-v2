import React from 'react';

const SkipLink = () => {
    return (
        <a
            href="#main-content"
            className="fixed top-4 left-4 z-50 -translate-y-[150%] rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0 focus:outline-none focus:ring-4 focus:ring-teal-500/50"
        >
            Skip to main content
        </a>
    );
};

export default SkipLink;
